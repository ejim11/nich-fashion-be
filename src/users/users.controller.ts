import { Body, Controller, Patch } from '@nestjs/common';

import { UsersService } from './providers/users.service';
import { PatchUserDto } from './dtos/patch-user.dto';
import { Role } from 'src/auth/enums/role-type.enum';
import { Roles } from 'src/auth/decorator/role.decorator';
import { ActiveUser } from 'src/auth/decorator/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Controller('users')
export class UsersController {
  constructor(
    /**
     * injecting the usersService
     */
    private readonly usersService: UsersService,
  ) {}

  @Patch()
  @Roles(Role.USER, Role.ADMIN)
  public patchUsers(
    @Body() patchUserDto: PatchUserDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.usersService.updateUser(user.sub, patchUserDto);
  }
}
