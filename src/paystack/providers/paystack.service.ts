import { Injectable } from '@nestjs/common';
import { InitiatePaymentProvider } from './initiate-payment.provider';
import { InitiatePaymentDto } from '../dtos/initiate-payment.dto';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Injectable()
export class PaystackService {
  constructor(
    /**
     * injecting the initiate payment provider
     */
    private readonly initiatePaymentProvider: InitiatePaymentProvider,
  ) {}

  public async initiatePayment(
    initiatePaymentDto: InitiatePaymentDto,
    user: ActiveUserData,
  ) {
    return await this.initiatePaymentProvider.initializePayment(
      initiatePaymentDto,
      user,
    );
  }
}
