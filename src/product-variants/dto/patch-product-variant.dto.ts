import { PartialType } from '@nestjs/mapped-types';
import { CreateProductVariantDto } from './create-product-variant.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class PatchProductVariantDto extends PartialType(
  CreateProductVariantDto,
) {
  @IsString()
  @IsOptional()
  id?: string;

  @IsBoolean()
  @IsOptional()
  soldOut?: boolean;
}
