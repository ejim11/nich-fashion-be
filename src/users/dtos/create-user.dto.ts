import { IsEmail, IsEnum, IsNotEmpty, MaxLength } from 'class-validator';
// import { accountType } from '../enums/account-type.enum';
// import { Role } from 'src/auth/enums/role-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/auth/enums/role-type.enum';

/**
 * dto class for creating user dto
 */
export class CreateUserDto {
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
  @IsNotEmpty()
  role: Role;
}
