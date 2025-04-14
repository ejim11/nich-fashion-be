import { Injectable, NotFoundException } from '@nestjs/common';
import { GetPaymentsDto } from '../dtos/get-payments.dto';
import { Repository } from 'typeorm';
import { Payment } from '../payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';

@Injectable()
export class FindAllPaymentsProvider {
  constructor(
    /**
     * injecting the payment respository
     */
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    /**
     * injecting the pagination provider
     */
    private readonly paginationProvider: PaginationProvider,
  ) {}

  public async findAll(paymentQuery: GetPaymentsDto) {
    // Clean the query to remove undefined parameters
    const cleanedQuery = this.cleanQuery(paymentQuery);
    const { limit, page, userId } = cleanedQuery;

    // Build the query
    let queryBuilder = this.paymentRepository.createQueryBuilder('payment');

    // Apply userId filter if provided
    if (userId) {
      queryBuilder = queryBuilder.where('payment.userId = :userId', { userId });
    }

    try {
      const payments = await this.paginationProvider.paginationQuery(
        { limit, page },
        queryBuilder,
      );

      return payments;
    } catch (error) {
      throw new NotFoundException(error.message || 'Payments not found');
    }
  }

  /**
   * Helper method to clean query by removing undefined parameters
   * @param query The input query object
   * @returns Cleaned query object
   */
  private cleanQuery(query: GetPaymentsDto): GetPaymentsDto {
    return Object.fromEntries(
      Object.entries(query).filter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, value]) =>
          value !== 'undefined' && value !== undefined && value !== '',
      ),
    ) as GetPaymentsDto;
  }
}
