import { CreateDeliveryStateDto } from './create-delivery-state.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateDeliveryStateDto extends PartialType(
  CreateDeliveryStateDto,
) {}
