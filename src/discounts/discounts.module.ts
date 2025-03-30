import { Module } from '@nestjs/common';
import { DiscountsController } from './discounts.controller';
import { DiscountsService } from './providers/discounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discount } from './discounts.entity';
import { ApplyForDiscountProvider } from './providers/apply-for-discount.provider';
import { CreateDiscountProvider } from './providers/create-discount.provider';
import { DiscountsUsageModule } from 'src/discounts-usage/discounts-usage.module';

@Module({
  imports: [TypeOrmModule.forFeature([Discount]), DiscountsUsageModule],
  controllers: [DiscountsController],
  providers: [
    DiscountsService,
    ApplyForDiscountProvider,
    CreateDiscountProvider,
  ],
})
export class DiscountsModule {}
