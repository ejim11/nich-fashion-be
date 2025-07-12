import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { PatchOrderDto } from './dtos/patch-order.dto';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/enums/role-type.enum';
import { OrdersService } from './providers/orders.service';
import { GetOrdersDto } from './dtos/get-orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    /**
     * injecting the orders service
     */
    private readonly ordersService: OrdersService,
  ) {}

  @Get('/:orderId')
  public findOrderById(@Param('orderId') orderId: string) {
    return this.ordersService.findOrderById(orderId);
  }

  // @Roles(Role.ADMIN)
  @Get('')
  public findAllOrders(@Query() orderQuery: GetOrdersDto) {
    return this.ordersService.findAll(orderQuery);
  }

  @Roles(Role.ADMIN)
  @Patch('/:orderId')
  public updateOrder(
    @Body() patchOrderDto: PatchOrderDto,
    @Param('orderId') orderId: string,
  ) {
    return this.ordersService.updateOrder(patchOrderDto, orderId);
  }
}
