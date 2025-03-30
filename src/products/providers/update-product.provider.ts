import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { PatchProductDto } from '../dtos/patch-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../product.entity';
import { ProductVariantsService } from 'src/product-variants/providers/product-variants.service';

@Injectable()
export class UpdateProductProvider {
  constructor(
    /**
     * injecting the product repository
     */
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    /**
     * injecting the product variant service
     */
    private readonly productVariantsService: ProductVariantsService,
  ) {}

  public async updateProduct(id: string, patchProductDto: PatchProductDto) {
    let product;
    // find the prd
    try {
      product = await this.productRepository.findOne({
        where: { id },
      });
    } catch (err) {
      throw new RequestTimeoutException(err);
    }
    if (!product) {
      throw new BadRequestException('Product does not exist');
    }
    // update product
    // Update top-level product fields (if provided)
    let productUpdated = false;
    if (patchProductDto.name !== undefined) {
      product.name = patchProductDto.name;
      productUpdated = true;
    }
    if (patchProductDto.price !== undefined) {
      product.price = patchProductDto.price;
      productUpdated = true;
    }
    if (patchProductDto.discount !== undefined) {
      product.discount = patchProductDto.discount;
      productUpdated = true;
    }

    if (patchProductDto.category !== undefined) {
      product.category = patchProductDto.category;
      productUpdated = true;
    }

    if (patchProductDto.dressStyle !== undefined) {
      product.dressStyle = patchProductDto.dressStyle;
      productUpdated = true;
    }

    if (patchProductDto.clothType !== undefined) {
      product.clothType = patchProductDto.clothType;
      productUpdated = true;
    }

    if (patchProductDto.material !== undefined) {
      product.material = patchProductDto.material;
      productUpdated = true;
    }

    if (patchProductDto.brand !== undefined) {
      product.brand = patchProductDto.brand;
      productUpdated = true;
    }

    try {
      // Save product only if top-level fields were updated
      if (productUpdated) {
        await this.productRepository.save(product);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    // Update only the specified variants
    if (patchProductDto.variants && patchProductDto.variants.length > 0) {
      for (const variantDto of patchProductDto.variants) {
        const variant =
          await this.productVariantsService.findProductVariantById(
            variantDto.id,
            product.id,
          );
        // Manually update only the provided fields
        if (variantDto.color !== undefined) variant.color = variantDto.color;
        if (variantDto.size !== undefined) variant.size = variantDto.size;
        if (variantDto.quantity !== undefined)
          variant.quantity = variantDto.quantity;
        if (variantDto.soldOut !== undefined)
          variant.soldOut = variantDto.soldOut;

        // Save the variant directly
        await this.productVariantsService.saveProductVariant(variant);
      }
    }

    // Return the updated product with its variants (for response)
    return this.productRepository.findOne({
      where: { id },
      relations: ['variants'],
    });
  }
}
