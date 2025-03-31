import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  /**
   * @function finds a product variant by id
   * @param variantId
   * @param productId
   * @returns a product variant
   */
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

  /**
   * @function saves a variant
   * @param variant
   * @returns  a product variant
   */
  public async saveProductVariant(
    variant: ProductVariant,
  ): Promise<ProductVariant> {
    return await this.productVariantRepository.save(variant);
  }

  /**
   * @function checks variant availability
   * @param variantId
   * @param productId
   * @param quantity
   */
  public async checkVariantAvailability(
    variantId: string,
    productId: string,
    quantity: number,
  ) {
    // Fetch the variant from the database, ensuring it belongs to the specified product
    const variant = await this.productVariantRepository.findOne({
      where: { id: variantId, product: { id: productId } },
      relations: ['product'], // Optional, for validation
    });

    // Check if the variant exists
    if (!variant) {
      throw new BadRequestException(
        `Variant with ID ${variantId} not found for product ${productId}`,
      );
    }

    // Check if the variant is sold out
    if (variant.soldOut) {
      throw new BadRequestException(
        `Variant ${variantId} (color: ${variant.color}, size: ${variant.size}) is sold out`,
      );
    }

    // Optional: Check if the requested quantity exceeds available stock
    if (quantity > variant.quantity) {
      throw new BadRequestException(
        `Requested quantity (${quantity}) for variant ${variantId} exceeds available stock (${variant.quantity})`,
      );
    }
  }
}
