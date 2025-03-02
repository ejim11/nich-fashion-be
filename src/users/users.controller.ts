import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { UsersService } from './providers/users.service';

@Controller('users')
export class UsersController {
  constructor(
    /**
     * injecting the usersService
     */
    private readonly usersService: UsersService,
  ) {}

  /**
   * route for creating a user
   * @param createUserDto
   * @returns the created user
   */
  @Post('/')
  @Auth(AuthType.None)
  @ApiOperation({
    summary: 'It creates a user ',
  })
  // documentation for responses
  @ApiResponse({
    status: 201,
    description: 'User created successfully based on the query',
  })
  @ApiBody({
    description: 'Contains user details',
    required: true,
    type: CreateUserDto,
    examples: {
      example1: {
        summary: 'Valid request example',
        value: {
          fullname: 'Ejim Favour',
          email: 'iloghaluagneskc@gmail.com',
          role: 'ticketPurchaser',
          password: '@Password1',
        },
      },
      example2: {
        summary: 'Invalid request example (missing password)',
        value: {
          fullname: 'Ejim Favour',
          email: 'iloghaluagneskc@gmail.com',
          role: 'ticketPurchaser',
        },
      },
    },
  })
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
