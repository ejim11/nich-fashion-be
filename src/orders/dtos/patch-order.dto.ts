import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from '../enums/order-status.enum';

export class PatchOrderDto {
  @IsString()
  @IsOptional()
  carrier?: string;

  @IsString()
  @IsOptional()
  carrierPhoneNumber?: string;

  @IsDate()
  @IsOptional()
  estimatedDeliveryDate?: Date;

  @IsEnum(OrderStatus)
  @IsOptional()
  orderStatus?: OrderStatus;
}
