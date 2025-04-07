import { IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

/**
 * base dto fot products
 */
class GetSubscribersBaseDto {}

/**
 * dto for get events
 */
export class GetSubscribersDto extends IntersectionType(
  GetSubscribersBaseDto,
  PaginationQueryDto,
) {}
