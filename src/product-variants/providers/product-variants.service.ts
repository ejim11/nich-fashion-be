import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
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
    productId?: string,
  ): Promise<ProductVariant> {
    const variant = await this.productVariantRepository.findOne({
      where: { id: variantId, product: productId ? { id: productId } : null },
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
   * @param manager
   * @param variantId
   * @param productId
   * @param quantity
   */
  public async checkVariantAvailability(
    manager: EntityManager,
    variantId: string,
    productId: string,
    quantity: number,
  ) {
    // Fetch the variant from the database, ensuring it belongs to the specified product
    // Fetch the variant with a pessimistic lock to prevent concurrent access
    const variant = await manager
      .createQueryBuilder(ProductVariant, 'variant')
      .setLock('pessimistic_write') // Lock the row
      .where('variant.id = :id AND variant.productId = :productId', {
        id: variantId,
        productId,
      })
      .getOne();

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

    // Reserve the stock by decrementing the quantity
    variant.quantity -= quantity;

    if (variant.quantity <= 0) {
      variant.soldOut = true;
    }

    // Save the updated variant (within the transaction)
    await manager.save(variant);
  }

  // Roll back the stock reservation if payment fails
  async rollbackStock(
    variantId: string,
    productId: string,
    quantity: number,
    manager: EntityManager,
  ): Promise<void> {
    // Fetch the variant with a lock
    const variant = await manager
      .createQueryBuilder(ProductVariant, 'variant')
      .setLock('pessimistic_write')
      .where('variant.id = :id AND variant.productId = :productId', {
        id: variantId,
        productId,
      })
      .getOne();

    if (variant) {
      // Restore the quantity
      variant.quantity += quantity;
      variant.soldOut = false; // Reset soldOut if quantity becomes positive
      await manager.save(variant);
    }
  }
}
