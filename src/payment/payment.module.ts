import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { PaymentController } from './payment.controller';
import { PaymentVariant } from './payment-variant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, PaymentVariant])],
  controllers: [PaymentController],
})
export class PaymentModule {}
