import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
// import { accountType } from '../enums/account-type.enum';
// import { Role } from 'src/auth/enums/role-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/auth/enums/role-type.enum';

/**
 * dto class for creating user dto
 */
export class CreateUserDto {
  /**
   * user lastname
   */
  @ApiProperty({
    description: 'This is the full name of the user',
    example: 'Ejim Favour',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(96)
  fullname: string;

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
   * user password
   */
  @ApiProperty({
    description: 'This is the password of the user',
    example: '@Favour233',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(96)
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    message:
      'Minimum eight characters, atleast one letter, number and special character',
  })
  password: string;

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
