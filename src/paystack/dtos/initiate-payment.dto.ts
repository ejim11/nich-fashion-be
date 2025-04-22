// i need info on the product, its variants, delivery info, discount info

import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PatchProductVariantDto } from 'src/product-variants/dto/patch-product-variant.dto';

class ProductWithVariantDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsInt()
  @IsNotEmpty()
  price: number;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PatchProductVariantDto)
  variants: PatchProductVariantDto[];
}

export class InitiatePaymentDto {
  @IsString()
  @IsOptional()
  deliveryPicker?: string;

  @IsString()
  @IsOptional()
  deliveryAddress?: string;

  @IsString()
  @IsOptional()
  discountId?: string;

  @IsInt()
  @IsNotEmpty()
  totalAmount: number;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProductWithVariantDto)
  products: ProductWithVariantDto[];
}
