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
    private readonly subscribersRepository: Repository<Subscriber>,
  ) {}

  /**
   * @function get all orders or all orders from a user
   * @param orderQuery
   * @returns paginated orders
   */
  public async findAll(
    subscriberQuery: GetSubscribersDto,
  ): Promise<Paginated<Subscriber>> {
    // Clean the query to remove undefined parameters
    const cleanedQuery = this.cleanQuery(subscriberQuery);
    const { limit, page } = cleanedQuery;

    // Build the query
    const queryBuilder =
      this.subscribersRepository.createQueryBuilder('subscriber');

    // Apply email filter if provided
    // if (email) {
    //   queryBuilder = queryBuilder.where('subscriber.email LIKE :email', {
    //     email: `%${email}%`,
    //   });
    // }

    try {
      const subscribers = await this.paginationProvider.paginationQuery(
        { limit, page },
        queryBuilder,
      );

      return subscribers;
    } catch (error) {
      throw new NotFoundException(error.message || 'Subscribers not found');
    }
  }

  /**
   * Helper method to clean query by removing undefined parameters
   * @param query The input query object
   * @returns Cleaned query object
   */
  private cleanQuery(query: GetSubscribersDto): GetSubscribersDto {
    return Object.fromEntries(
      Object.entries(query).filter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, value]) =>
          value !== 'undefined' && value !== undefined && value !== '',
      ),
    ) as GetSubscribersDto;
  }
}
