import { IsOptional, IsString } from 'class-validator';
import { IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

/**
 * base dto fot products
 */
class GetProductsBaseDto {
  /**
   * product name
   */
  @IsString()
  @IsOptional()
  name?: string;

  /**
   * product category
   */
  @IsString()
  @IsOptional()
  category?: string;

  /**
   * productClothType
   */
  @IsString()
  @IsOptional()
  clothType?: string;

  /**
   * product price
   */
  @IsString()
  @IsOptional()
  price?: string;

  /**
   * product colors
   */
  @IsString()
  @IsOptional()
  colors?: string;

  /**
   * product sizes
   */
  @IsString()
  @IsOptional()
  sizes?: string;

  /**
   * product dressing style
   */
  @IsString()
  @IsOptional()
  dressStyle?: string;
}

/**
 * dto for get events
 */
export class GetProductsDto extends IntersectionType(
  GetProductsBaseDto,
  PaginationQueryDto,
) {}
