import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductVariant } from '../product-variants.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductVariantsService {
  constructor(
    /**
     * injecting the product variant repository
     */
    @InjectRepository(ProductVariant)
    private readonly productVariantRepository: Repository<ProductVariant>,
  ) {}

  public async findProductVariantById(
    variantId: string,
    productId: string,
  ): Promise<ProductVariant> {
    const variant = await this.productVariantRepository.findOne({
      where: { id: variantId, product: { id: productId } },
    });

    if (!variant) {
      throw new NotFoundException(
        `Variant with ID ${variantId} not found for product ${productId}`,
      );
    }

    return variant;
  }

  public async saveProductVariant(
    variant: ProductVariant,
  ): Promise<ProductVariant> {
    return await this.productVariantRepository.save(variant);
  }
}
