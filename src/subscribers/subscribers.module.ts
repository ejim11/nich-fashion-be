import { Module } from '@nestjs/common';
import { SubscribersService } from './providers/subscribers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscriber } from './subscriber.entity';
import { MailModule } from 'src/mail/mail.module';
import { SubscribersController } from './subscribers.controller';
import { FindAllSubscribersProvider } from './providers/find-all-subscribers.provider';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  controllers: [SubscribersController],
  providers: [SubscribersService, FindAllSubscribersProvider],
  imports: [
    PaginationModule,
    TypeOrmModule.forFeature([Subscriber]),
    MailModule,
  ],
})
export class SubscribersModule {}
