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
    const { limit, page } = orderQuery;

    const options = {
      where: orderQuery.userId ? [{ userId: orderQuery.userId }] : null,
    };

    try {
      const products = await this.paginationProvider.paginationQuery(
        {
          limit: limit,
          page: page,
        },
        this.ordersRepository,
        options,
      );

      return products;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
