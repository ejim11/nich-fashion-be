import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';

import { UsersService } from './providers/users.service';
import { PatchUserDto } from './dtos/patch-user.dto';
import { Role } from 'src/auth/enums/role-type.enum';
import { Roles } from 'src/auth/decorator/role.decorator';
import { ActiveUser } from 'src/auth/decorator/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import {
  ApiHeaders,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { GetUsersDto } from './dtos/get-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    /**
     * injecting the usersService
     */
    private readonly usersService: UsersService,
  ) {}

  /**
   * route for getting a user by user id
   * @param userId
   * @returns a user
   */
  @ApiOperation({
    summary: 'It finds a user based on their id',
  })
  @ApiResponse({
    status: 200,
    description: 'User is fetched successfully based on user id',
  })
  @ApiParam({
    name: 'userId',
    required: true,
    type: String,
    description: 'The unique identifier of the user',
    example: '12345',
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'Bearer token for authorization',
    },
    {
      name: 'X-Custom-Header',
      required: false,
      description: 'A custom optional header',
    },
  ])
  @Get('/:userId')
  public findUser(@Param('userId') userId: string) {
    return this.usersService.findOneById(userId);
  }

  /**
   * route for getting all users
   * @param usersQuery
   * @returns all users
   */
  @ApiOperation({
    summary: 'It finds all users ',
  })
  @ApiResponse({
    status: 200,
    description: 'All users are fetched and paginated',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'The number of entries returned per query',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description:
      'The position of the page number that you want the api to return',
    example: 1,
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'Bearer token for authorization',
    },
    {
      name: 'X-Custom-Header',
      required: false,
      description: 'A custom optional header',
    },
  ])
  @Get()
  public findAllUsers(@Query() usersQuery: GetUsersDto) {
    return this.usersService.findAll(usersQuery);
  }

  @Patch()
  @Roles(Role.USER, Role.ADMIN)
  public patchUsers(
    @Body() patchUserDto: PatchUserDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.usersService.updateUser(user.sub, patchUserDto);
  }

  /**
   * route for deleting a user
   * @param userId
   * @returns a message indicating user was deleted
   */
  @ApiOperation({
    summary: 'It deletes a user based on their id',
  })
  @ApiResponse({
    status: 204,
    description: 'User successfully deleted',
  })
  @ApiParam({
    name: 'userId',
    required: true,
    type: String,
    description: 'The unique identifier of the user',
    example: '12345',
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'Bearer token for authorization',
    },
    {
      name: 'X-Custom-Header',
      required: false,
      description: 'A custom optional header',
    },
  ])
  @Delete('/:userId')
  public deleteUser(@Param('userId') userId: string) {
    return this.usersService.deleteUser(userId);
  }
}
