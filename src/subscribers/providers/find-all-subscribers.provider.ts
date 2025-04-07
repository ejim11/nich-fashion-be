import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Subscriber } from '../subscriber.entity';
import { Repository } from 'typeorm';
import { GetSubscribersDto } from '../dtos/get-subscribers.dto';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';

@Injectable()
export class FindAllSubscribersProvider {
  constructor(
    /**
     * injecting the pagination provider
     */
    private readonly paginationProvider: PaginationProvider,

    /**
     * injecting the orders repository
     */
    @InjectRepository(Subscriber)
    private readonly ordersRepository: Repository<Subscriber>,
  ) {}

  /**
   * @function get all orders or all orders from a user
   * @param orderQuery
   * @returns paginated orders
   */
  public async findAll(
    subscriberQuery: GetSubscribersDto,
  ): Promise<Paginated<Subscriber>> {
    const { limit, page } = subscriberQuery;

    const options = {};

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
