import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateProductVariantDto {
  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  size: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  quantity: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  images?: string[];
}
