import { Injectable } from '@nestjs/common';
import { InitiatePaymentProvider } from './initiate-payment.provider';
import { InitiatePaymentDto } from '../dtos/initiate-payment.dto';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { VerifyPaymentProvider } from './verify-payment.provider';

@Injectable()
export class PaystackService {
  constructor(
    /**
     * injecting the initiate payment provider
     */
    private readonly initiatePaymentProvider: InitiatePaymentProvider,

    /**
     * injecting the verify payment provider
     */
    private readonly verifyPaymentProvider: VerifyPaymentProvider,
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

  public async verifyPayment(body: any, signature: string, req: any) {
    return await this.verifyPaymentProvider.paymentWebhook(
      body,
      signature,
      req,
    );
  }
}
