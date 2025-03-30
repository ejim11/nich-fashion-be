import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateDiscountDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsInt()
  @IsNotEmpty()
  percentOff: number;

  @IsDate()
  @IsNotEmpty()
  validUntil: Date;
}
