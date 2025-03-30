import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';
import { PatchProductVariantDto } from 'src/product-variants/dto/patch-product-variant.dto';

export class PatchProductDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsInt()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  discount?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  dressStyle?: string;

  @IsString()
  @IsOptional()
  clothType?: string;

  @IsString()
  @IsOptional()
  material: string;

  @IsString()
  @IsOptional()
  brand: string;

  @IsString()
  @IsOptional()
  shortDescription: string;

  @IsString()
  @IsOptional()
  longDescription: string;

  @IsArray()
  @IsOptional()
  variants?: PatchProductVariantDto[];
}
