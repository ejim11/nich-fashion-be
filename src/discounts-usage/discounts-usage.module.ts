import { Module } from '@nestjs/common';
import { DiscountsUsageService } from './providers/discounts-usage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountUsage } from './discounts-usage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiscountUsage])],
  providers: [DiscountsUsageService],
  exports: [DiscountsUsageService],
})
export class DiscountsUsageModule {}
