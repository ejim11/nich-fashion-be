import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateProductProvider } from './create-product.provider';
import { CreateProductDto } from '../dtos/createProductDto';
import { Between, In, Like, Repository } from 'typeorm';
import { Product } from '../product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetProductsDto } from '../dtos/get-product.dto';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';

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
     * injecting the pagination provider
     */
    private readonly paginationprovider: PaginationProvider,
  ) {}

  /**
   *@function createProduct
   * @param createProductDto
   * @param user
   * @param images
   * @returns the new product created
   */
  public async createProduct(
    createProductDto: CreateProductDto,
    files: { [key: string]: Express.Multer.File[] },
  ) {
    return this.createProductProvider.createProduct(createProductDto, files);
  }

  /**
   * function to get product by id
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
   * function for getting all products
   * @param productQuery
   * @returns all products
   */
  public async findAll(
    productQuery: GetProductsDto,
  ): Promise<Paginated<Product>> {
    const { limit, page } = productQuery;

    const whereOptions = [];

    Object.keys(productQuery).forEach((key) => {
      if (key === 'limit' || key === 'page' || !productQuery[key]) {
        return;
      }

      const conditions = {
        category: productQuery['category']
          ? In(productQuery['category'].slice().split(','))
          : undefined,
        price: productQuery['price']
          ? Between(
              parseFloat(productQuery['price'].slice().split('-')[0]),
              parseFloat(productQuery['price'].slice().split('-')[1]),
            )
          : undefined,
        clothType: productQuery['clothType']
          ? In(productQuery['clothType'].slice().split(','))
          : undefined,
        dressStyle: productQuery['dressStyle']
          ? In(productQuery['dressStyle'].slice().split(','))
          : undefined,
        name: productQuery['name']
          ? Like(`%${productQuery['name'].slice().split('-').join(' ')}%`)
          : undefined,
        variants: {
          color: productQuery['colors']
            ? In(productQuery['colors'].slice().split(','))
            : undefined,
          size: productQuery['sizes']
            ? In(productQuery['sizes'].slice().split(','))
            : undefined,
        },
      };

      // Remove undefined nested conditions for variants
      if (
        conditions.variants.color === undefined &&
        conditions.variants.size === undefined
      ) {
        conditions.variants = undefined;
      }

      // Remove undefined conditions
      const filteredConditions = Object.fromEntries(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Object.entries(conditions).filter(([_, v]) => v !== undefined),
      );

      whereOptions.push(filteredConditions);
    });

    const checkWhereOptions = Object.keys(whereOptions).length;

    const options = {
      where: checkWhereOptions ? whereOptions : null,
      relations: ['variants', 'variants.images'],
    };

    try {
      const products = await this.paginationprovider.paginationQuery(
        {
          limit: limit,
          page: page,
        },
        this.productRepository,
        options,
      );

      return products;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
