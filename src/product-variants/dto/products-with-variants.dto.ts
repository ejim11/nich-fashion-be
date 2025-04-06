import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { PatchProductVariantDto } from './patch-product-variant.dto';

class ProductWithVariantDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PatchProductVariantDto)
  variants: PatchProductVariantDto[];
}

export class ProductsWithVariantsDto {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProductWithVariantDto)
  products: ProductWithVariantDto[];
}
