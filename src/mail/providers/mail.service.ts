import { ROOT_PATH } from '../../config/paths.config';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { Subscriber } from 'src/subscribers/subscriber.entity';
import { User } from 'src/users/user.entity';

/**
 * service for the mail module
 */
@Injectable()
export class MailService {
  /**
   * constructor
   * @param mailerService
   */
  constructor(
    /**
     * injecting mailer service
     */
    private mailerService: MailerService,
  ) {}

  /**
   * function for sending reset otp mail to user
   * @param user
   * @param otp
   */
  public async sendResetOtp(user: User, otp: string): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      from: `Ticket Hive - Support Team  <${'favourejim56@gmail.com'}>`,
      subject: `🔐 Reset Your Password – Let's Get You Back on Track!`,
      template: path.join(ROOT_PATH, '/src/mail/templates/resetOtp.ejs'),
      context: {
        fullname: user.fullname,
        email: user.email,
        otp: otp,
      },
    });
  }

  /**
   * function for sending mail to user when they subscribe to the newsletter
   * @param subscriber
   */
  public async sendSubscriberMail(subscriber: Subscriber): Promise<void> {
    await this.mailerService.sendMail({
      to: subscriber.email,
      from: `Ticket Hive -Team  <${'favourejim56@gmail.com'}>`,
      subject: `Welcome to Ticket Hive's Newsletter! 🎉`,
      template: path.join(ROOT_PATH, '/src/mail/templates/subscription.ejs'),
      context: {
        email: subscriber.email,
        id: subscriber.id,
      },
    });
  }
}
