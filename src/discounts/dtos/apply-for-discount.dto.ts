import { IsNotEmpty, IsString } from 'class-validator';

export class ApplyForDiscountDto {
  @IsString()
  @IsNotEmpty()
  code: string;
}
