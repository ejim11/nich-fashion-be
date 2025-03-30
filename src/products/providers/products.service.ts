import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateProductProvider } from './create-product.provider';
import { CreateProductDto } from '../dtos/createProductDto';
import { Repository } from 'typeorm';
import { Product } from '../product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetProductsDto } from '../dtos/get-product.dto';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { PatchProductDto } from '../dtos/patch-product.dto';
import { FindAllProductsProvider } from './find-all-products.provider';
import { UpdateProductProvider } from './update-product.provider';

@Injectable()
export class ProductsService {
  constructor(
    /**
     * injecting the create product provider
     */

    private readonly createProductProvider: CreateProductProvider,

    /**
     * injecting the product repository
     */
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    /**
     * injecting the find all products provider
     */
    private readonly findAllProductsProvider: FindAllProductsProvider,

    /**
     * injecting the update product provider
     */
    private readonly updateProductProvider: UpdateProductProvider,
  ) {}

  /**
   * @function creates a product
   * @param createProductDto
   * @param files
   * @returns the created product
   */
  public async createProduct(
    createProductDto: CreateProductDto,
    files: { [key: string]: Express.Multer.File[] },
  ): Promise<Product> {
    return this.createProductProvider.createProduct(createProductDto, files);
  }

  /**
   * @function to get product by id
   * @param productId
   * @returns product by id
   */
  public async findProductById(productId: string): Promise<Product> {
    try {
      const product = await this.productRepository.findOneBy({
        id: productId,
      });

      if (!product) {
        throw new NotFoundException(`product with ${productId}  not found`);
      }

      return product;
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }

  /**
   * @function for getting all products
   * @param productQuery
   * @returns all products
   */
  public async findAll(
    productQuery: GetProductsDto,
  ): Promise<Paginated<Product>> {
    return await this.findAllProductsProvider.findAll(productQuery);
  }

  /**
   * @function updates a product
   * @param id
   * @param patchProductDto
   * @returns updated product
   */
  public async updateProduct(
    id: string,
    patchProductDto: PatchProductDto,
  ): Promise<Product> {
    return await this.updateProductProvider.updateProduct(id, patchProductDto);
  }

  /**
   * @function deletes a product
   * @param productId
   * @returns a message that the item was successfully deleted
   */
  public async deleteProduct(productId: string): Promise<{ message: string }> {
    try {
      await this.productRepository.delete(productId);
      return {
        message: `Product ${productId}, was successfully deleted`,
      };
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }
}
