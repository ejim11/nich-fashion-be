import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { CreateSubscriberDto } from './dtos/create-subscriber.dto';
import { SubscribersService } from './providers/subscribers.service';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/enums/role-type.enum';
import { GetSubscribersDto } from './dtos/get-subscribers.dto';

@Controller('subscribers')
export class SubscribersController {
  /**
   * constructor
   * @param subscriberService
   */
  constructor(
    /**
     * injecting the subscriber service
     */
    private readonly subscriberService: SubscribersService,
  ) {}

  @Post()
  @Auth(AuthType.None)
  public createSubscriber(@Body() createSubscriberDto: CreateSubscriberDto) {
    return this.subscriberService.createSubscriber(createSubscriberDto);
  }

  @Get('/:subscriberId')
  @Auth(AuthType.None)
  public deleteSubscriber(@Param('subscriberId') subscriberId: string) {
    return this.subscriberService.unsubscribeEmail(subscriberId);
  }

  @Get('')
  @Roles(Role.ADMIN)
  public findAllSubscribers(@Query() subscriberQuery: GetSubscribersDto) {
    return this.subscriberService.findAllSubscribers(subscriberQuery);
  }
}
