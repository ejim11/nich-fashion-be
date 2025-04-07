import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from '../order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PatchOrderDto } from '../dtos/patch-order.dto';
import { FindAllOrdersProvider } from './find-all-orders.provider';
import { GetOrdersDto } from '../dtos/get-orders.dto';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';

@Injectable()
export class OrdersService {
  constructor(
    /**
     * injecting the orders repository
     */
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,

    /**
     * injecting the find all orders provider
     */
    private readonly findAllOrdersProvider: FindAllOrdersProvider,
  ) {}

  public async updateOrder(patchOrderDto: PatchOrderDto, orderId: string) {
    let order;
    // find the order
    try {
      order = await this.ordersRepository.findOneBy({
        id: orderId,
      });
    } catch (err) {
      throw new RequestTimeoutException(err);
    }
    if (!order) {
      throw new BadRequestException('Order does not exist');
    }
    // update order
    order = { ...order, ...patchOrderDto };

    try {
      await this.ordersRepository.save(order);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    return order;
  }

  public async findOrderById(orderId: string) {
    let order: Order;

    try {
      order = await this.ordersRepository.findOne({
        where: { id: orderId },
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

    if (!order) {
      throw new BadRequestException('The bank order does not exist');
    }

    return order;
  }

  /**
   * @function get all orders or all orders from a user
   * @param orderQuery
   * @returns paginated orders
   */
  public async findAll(orderQuery: GetOrdersDto): Promise<Paginated<Order>> {
    return await this.findAllOrdersProvider.findAll(orderQuery);
  }
}
