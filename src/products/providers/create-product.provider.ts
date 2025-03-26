import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Product } from '../product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from '../dtos/createProductDto';
import { UploadsService } from 'src/uploads/providers/uploads.service';

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

    /**
     * injecting uploads service
     */
    private readonly uploadsService: UploadsService,
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

      console.log(createProductDto.variants);

      const variantsImages = [];

      Object.entries(images).map(async ([key, fileArray]) => {
        console.log(fileArray);
        // loop through the array of files and upload them
        const storedImagesUrls = await Promise.all(
          fileArray.map((file: Express.Multer.File) =>
            this.uploadsService.uploadFile(file),
          ),
        );

        console.log(storedImagesUrls);

        // add the array of image urls to the publicly scoped array
        console.log(key);
        console.log(fileArray);
      });
    } catch (error) {
      // if unsuccessful rollback
      // we rollback the txn here if it is not successful
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Could not complete the transaction', {
        description: String(error),
      });
    } finally {
      // relsease the connection
      // release connection whether it was successful or not
      try {
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException('Could not release the connection', {
          description: String(error),
        });
      }
    }

    // create the product variants

    // return the product
  }
}
