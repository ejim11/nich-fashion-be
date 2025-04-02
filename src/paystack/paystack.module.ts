import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaystackController } from './paystack.controller';
import { PaystackService } from './providers/paystack.service';
import { InitiatePaymentProvider } from './providers/initiate-payment.provider';
import paystackConfig from './config/paystack.config';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { ProductVariantsModule } from 'src/product-variants/product-variants.module';
import { VerifyPaymentProvider } from './providers/verify-payment.provider';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    ProductVariantsModule,
    ConfigModule.forFeature(paystackConfig),
  ],
  controllers: [PaystackController],
  providers: [PaystackService, InitiatePaymentProvider, VerifyPaymentProvider],
})
export class PaystackModule {}
