import { IsOptional, IsString } from 'class-validator';
import { IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

/**
 * base dto fot products
 */
class GetPaymentsBaseDto {
  @IsString()
  @IsOptional()
  userId?: string;
}

/**
 * dto for get events
 */
export class GetPaymentsDto extends IntersectionType(
  GetPaymentsBaseDto,
  PaginationQueryDto,
) {}
