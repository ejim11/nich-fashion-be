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
import { ProductVariant } from 'src/product-variants/product-variants.entity';
import { ProductImage } from 'src/product-images/product-image.entity';

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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new RequestTimeoutException('Could not connect to datasource');
    }

    try {
      // create the product
      const product = queryRunner.manager.create(Product, {
        ...createProductDto,
        variants: [],
      });

      // save the product
      const savedProduct = await queryRunner.manager.save(product);

      // upload the images in the variants
      const variantsImages = [];

      Object.entries(images).forEach(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([key, fileArray]) => {
          variantsImages.push(fileArray);
        },
      );

      const storedImagesUrls = [];

      // loop through the array of files and upload them

      for (let i = 0; i < variantsImages.length; i++) {
        const urls = await Promise.all(
          variantsImages[i].map(
            async (file) => await this.uploadsService.uploadFile(file),
          ),
        );
        storedImagesUrls.push(urls);
      }

      // loop through the product variants and create product variants

      const savedVariants = [];

      for (const variant of createProductDto.variants) {
        /**
         * param
         * entity
         * dto
         */
        const prVariant = queryRunner.manager.create(ProductVariant, {
          ...variant,
          product: savedProduct,
        });

        const vr = await queryRunner.manager.save(prVariant);
        savedVariants.push(vr);
      }
      // const savedVariants = await Promise.all(
      //   createProductDto.variants.map(async (variant) => {
      //     const prVariant = queryRunner.manager.create(ProductVariant, {
      //       ...variant,
      //       product: savedProduct,
      //     });

      //     return await queryRunner.manager.save(prVariant);
      //   }),
      // );

      // loop through the images and create a product image
      const productImages = storedImagesUrls
        .map((imgUrls: string[], urlsIndex) =>
          imgUrls.map((imgUrl, index) =>
            queryRunner.manager.create(ProductImage, {
              imagePath: imgUrl,
              displayOrder: index,
              productVariant: savedVariants[urlsIndex],
            }),
          ),
        )
        .flat();

      productImages.map(async (image) => await queryRunner.manager.save(image));

      // if successful commit
      // ensures the txn is committed to the db
      await queryRunner.commitTransaction();
      return { product: savedProduct };
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
