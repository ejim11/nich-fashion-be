import { IsOptional, IsString } from 'class-validator';
import { IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

/**
 * base dto fot products
 */
class GetOrdersBaseDto {
  @IsString()
  @IsOptional()
  userId?: string;
}

/**
 * dto for get events
 */
export class GetOrdersDto extends IntersectionType(
  GetOrdersBaseDto,
  PaginationQueryDto,
) {}
