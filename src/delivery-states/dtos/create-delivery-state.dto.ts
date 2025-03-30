import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateDeliveryStateDto {
  @IsString()
  @IsNotEmpty()
  state: string;

  @IsInt()
  @IsNotEmpty()
  fee: number;
}
