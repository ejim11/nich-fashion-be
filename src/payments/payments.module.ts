import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { PaymentsController } from './payments.controller';
import { PaymentVariant } from './payment-variant.entity';
import { PaymentsService } from './providers/payments.service';
import { FindAllPaymentsProvider } from './providers/find-all-payments.provider';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  imports: [
    PaginationModule,
    TypeOrmModule.forFeature([Payment, PaymentVariant]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, FindAllPaymentsProvider],
})
export class PaymentsModule {}
