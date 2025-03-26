import { Injectable } from '@nestjs/common';
import { CreateProductProvider } from './create-product.provider';
import { CreateProductDto } from '../dtos/createProductDto';

@Injectable()
export class ProductsService {
  constructor(
    /**
     * injecting the create product provider
     */

    private readonly createProductProvider: CreateProductProvider,
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
}
