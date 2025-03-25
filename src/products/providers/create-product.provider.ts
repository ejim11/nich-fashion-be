import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Product } from '../product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from '../dtos/createProductDto';

@Injectable()
export class CreateProductProvider {
  constructor(
    /**
     * injecting the product repository
     */
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    /**
     * Injecting datasource
     */
    private readonly dataSource: DataSource,
  ) {}

  public async createProduct(
    createProductDto: CreateProductDto,
    images: { [key: string]: Express.Multer.File[] },
  ) {
    // start query transaction
    // create Query Runner instance
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      // connect query runner to datasource
      await queryRunner.connect();
      // start transaction
      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException('Could not connect to datasource');
    }

    // create the product
    try {
      // const product = queryRunner.manager.create(Product, {
      //   ...createProductDto,
      // });

      // upload the images in the variants
      console.log(images);
    } catch (error) {
      throw new ConflictException(error);
    }

    // create the product variants

    // return the product
    console.log(images);
  }
}
