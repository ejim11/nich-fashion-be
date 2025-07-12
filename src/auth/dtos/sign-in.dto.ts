import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { Role } from '../enums/role-type.enum';

/**
 * sign in dto
 */
export class SignInDto {
  /**
   * user email address
   */
  @ApiProperty({
    description: 'This is the email of the user',
    example: 'Favour@gmail.com',
  })
  @IsEmail()
  @MaxLength(96)
  @IsNotEmpty()
  email: string;

  /**
   * user role
   */
  @ApiProperty({
    description: 'This is the role of the user',
    example: 'Admin',
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
