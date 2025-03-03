import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

/**
 * otp sign in dto
 */
export class OtpSigninDto {
  /**
   * otp for signin
   */
  @ApiProperty({
    description: 'This is the reset otp',
    example: 2343,
  })
  @IsInt()
  @IsNotEmpty()
  otp: number;
}
