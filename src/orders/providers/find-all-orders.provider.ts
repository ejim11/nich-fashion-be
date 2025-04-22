import { Injectable, NotFoundException } from '@nestjs/common';
import { GetOrdersDto } from '../dtos/get-orders.dto';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { Order } from '../order.entity';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindAllOrdersProvider {
  constructor(
    /**
     * injecting the pagination provider
     */
    private readonly paginationProvider: PaginationProvider,

    /**
     * injecting the orders repository
     */
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}

  /**
   * @function get all orders or all orders from a user
   * @param orderQuery
   * @returns paginated orders
   */
  public async findAll(orderQuery: GetOrdersDto): Promise<Paginated<Order>> {
    // Clean the query to remove undefined parameters
    const cleanedQuery = this.cleanQuery(orderQuery);
    const { limit, page, userId } = cleanedQuery;

    // Build the query
    let queryBuilder = this.ordersRepository.createQueryBuilder('order');

    // Apply userId filter if provided
    if (userId) {
      queryBuilder = queryBuilder.where('order.userId = :userId', { userId });
    }

    queryBuilder = queryBuilder.orderBy('order.createdAt', 'DESC');

    try {
      const orders = await this.paginationProvider.paginationQuery(
        { limit, page },
        queryBuilder,
      );

      return orders;
    } catch (error) {
      throw new NotFoundException(error.message || 'Orders not found');
    }
  }

  /**
   * Helper method to clean query by removing undefined parameters
   * @param query The input query object
   * @returns Cleaned query object
   */
  private cleanQuery(query: GetOrdersDto): GetOrdersDto {
    return Object.fromEntries(
      Object.entries(query).filter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, value]) =>
          value !== 'undefined' && value !== undefined && value !== '',
      ),
    ) as GetOrdersDto;
  }
}
