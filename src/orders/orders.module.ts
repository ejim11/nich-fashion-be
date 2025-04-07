import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './providers/orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { FindAllOrdersProvider } from './providers/find-all-orders.provider';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  imports: [PaginationModule, TypeOrmModule.forFeature([Order])],
  controllers: [OrdersController],
  providers: [OrdersService, FindAllOrdersProvider],
})
export class OrdersModule {}
