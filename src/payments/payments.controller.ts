import { Controller, Get, Param, Query } from '@nestjs/common';
import { PaymentsService } from './providers/payments.service';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/enums/role-type.enum';
import { GetPaymentsDto } from './dtos/get-payments.dto';

@Controller('payments')
export class PaymentsController {
  constructor(
    /**
     * injecting the payments service
     */
    private readonly paymentsService: PaymentsService,
  ) {}

  @Get('/:paymentId')
  @Roles(Role.ADMIN)
  public findPaymentById(@Param('paymentId') paymentId: string) {
    return this.paymentsService.findOrderById(paymentId);
  }

  @Get('')
  public findAllPayments(@Query() orderQuery: GetPaymentsDto) {
    return this.paymentsService.findAll(orderQuery);
  }
}
