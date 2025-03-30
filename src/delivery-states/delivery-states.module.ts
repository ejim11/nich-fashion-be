import { Module } from '@nestjs/common';
import { DeliveryStatesController } from './delivery-states.controller';
import { DeliveryStatesService } from './providers/delivery-states.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryState } from './delivery-state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryState])],
  controllers: [DeliveryStatesController],
  providers: [DeliveryStatesService],
})
export class DeliveryStatesModule {}
