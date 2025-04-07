import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { Payment } from '../payment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetPaymentsDto } from '../dtos/get-payments.dto';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { FindAllPaymentsProvider } from './find-all-payments.provider';

@Injectable()
export class PaymentsService {
  constructor(
    /**
     * injecting the payment repository
     */
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    /**
     * injecting the find all payments provider
     */
    private readonly findAllPaymentsProvider: FindAllPaymentsProvider,
  ) {}

  public async findOrderById(paymentId: string) {
    let payment: Payment;

    try {
      payment = await this.paymentRepository.findOne({
        where: { id: paymentId },
      });
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    if (!payment) {
      throw new BadRequestException('The bank order does not exist');
    }

    return payment;
  }

  /**
   * @function get all payments or all orders from a user
   * @param paymentQuery
   * @returns paginated payments
   */
  public async findAll(
    orderQuery: GetPaymentsDto,
  ): Promise<Paginated<Payment>> {
    return await this.findAllPaymentsProvider.findAll(orderQuery);
  }
}
