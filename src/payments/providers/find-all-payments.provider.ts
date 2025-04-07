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
    const { limit, page } = paymentQuery;

    const options = {
      where: paymentQuery.userId ? [{ userId: paymentQuery.userId }] : null,
    };

    try {
      const products = await this.paginationProvider.paginationQuery(
        {
          limit: limit,
          page: page,
        },
        this.paymentRepository,
        options,
      );

      return products;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
