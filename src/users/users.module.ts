import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { CreateUsersProvider } from './providers/create-users.provider';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
import { StoreOtpAndExpireProvider } from './providers/store-otp-and-expire.provider';
import { FindUserByOtpAndExpiryTimeProvider } from './providers/find-user-by-reset-otp-and-expiry-time.provider';
import { FindOneByIdProvider } from './providers/find-one-by-id.provider';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { ClearOtpAndExpiryTimeProvider } from './providers/clear-otp-and-expiry-time.provider';

@Module({
  providers: [
    UsersService,
    CreateUsersProvider,
    FindOneUserByEmailProvider,
    StoreOtpAndExpireProvider,
    FindUserByOtpAndExpiryTimeProvider,
    FindOneByIdProvider,
    ClearOtpAndExpiryTimeProvider,
  ],
  controllers: [UsersController],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),
    PaginationModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
