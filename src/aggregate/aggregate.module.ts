import { Module } from '@nestjs/common';
import { AggregateController } from './aggregate.controller';
import { AggregateService } from './providers/aggregate.service';
import { GetAdminDashboardProvider } from './providers/get-admin-dashboard.provider';
import { PaymentsModule } from 'src/payments/payments.module';

@Module({
  controllers: [AggregateController],
  providers: [AggregateService, GetAdminDashboardProvider],
  imports: [PaymentsModule],
})
export class AggregateModule {}
