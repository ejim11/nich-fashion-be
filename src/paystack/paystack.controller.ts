import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { PaystackService } from './providers/paystack.service';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/enums/role-type.enum';
import { InitiatePaymentDto } from './dtos/initiate-payment.dto';
import { ActiveUser } from 'src/auth/decorator/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

@Controller('paystack')
export class PaystackController {
  constructor(
    /**
     * injecting the paystack service
     */
    private readonly paystackService: PaystackService,
  ) {}

  @Post('/initiate-payment')
  @Roles(Role.USER)
  //   @Auth(AuthType.None)
  public initiatePayment(
    @Body() initiatePaymentDto: InitiatePaymentDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.paystackService.initiatePayment(initiatePaymentDto, user);
  }

  @Post('/webhook')
  @Auth(AuthType.None)
  @HttpCode(HttpStatus.OK)
  async handlePaymentWebhook(
    @Body() body: any,
    @Headers('x-paystack-signature') signature: string,
    @Req() req: any,
  ) {
    return this.paystackService.verifyPayment(body, signature, req);
  }
}
