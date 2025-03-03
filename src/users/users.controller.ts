import { Controller } from '@nestjs/common';

import { UsersService } from './providers/users.service';

@Controller('users')
export class UsersController {
  constructor(
    /**
     * injecting the usersService
     */
    private readonly usersService: UsersService,
  ) {}
}
