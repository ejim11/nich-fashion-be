import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateSubscriberDto } from '../dtos/create-subscriber.dto';
import { Repository } from 'typeorm';
import { Subscriber } from '../subscriber.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/providers/mail.service';
import { FindAllSubscribersProvider } from './find-all-subscribers.provider';
import { GetSubscribersDto } from '../dtos/get-subscribers.dto';

/**
 * service for the subscriber module
 */
@Injectable()
export class SubscribersService {
  /**
   * constructor
   * @param subscriberRepository
   * @param mailService
   */
  constructor(
    /**
     * injecting the subscriber repository
     */
    @InjectRepository(Subscriber)
    private readonly subscriberRepository: Repository<Subscriber>,

    /**
     * injecting the mail service
     */
    private readonly mailService: MailService,

    /**
     * injecting the find all subscribers provider
     */
    private readonly findAllSubscribersProviders: FindAllSubscribersProvider,
  ) {}

  /**
   * function for creatng a subscriber
   * @param createSubscriberDto
   * @returns message that subscriber has successfully subscribed to the newsletter
   */
  public async createSubscriber(createSubscriberDto: CreateSubscriberDto) {
    const subscriber = this.subscriberRepository.create(createSubscriberDto);

    try {
      await this.subscriberRepository.save(subscriber);
      await this.mailService.sendSubscriberMail(subscriber);
      return {
        message: 'Subscribed to newsletter successfully',
      };
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }

  /**
   * function for unsubscribing from newsletter
   * @param id
   * @returns message that subscriber has unsubscribed from the newsletter
   */
  public async unsubscribeEmail(id: string) {
    try {
      await this.subscriberRepository.delete(id);
      return {
        message: 'Unsubscribed from newsletter successfully',
      };
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }

  public async findAllSubscribers(subscriberQuery: GetSubscribersDto) {
    return await this.findAllSubscribersProviders.findAll(subscriberQuery);
  }
}
