import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { MailService } from 'src/mail/providers/mail.service';
import { ContactUsDto } from '../dtos/contact-us.dto';

@Injectable()
export class ContactUsService {
  constructor(
    /**
     * injecting the mail service
     */
    private readonly mailService: MailService,
  ) {}

  public async contactUs(contactUsDto: ContactUsDto) {
    const { name, email, message } = contactUsDto;

    try {
      await this.mailService.sendContactUsMail(name, email, message);
    } catch (error) {
      new RequestTimeoutException(error);
    }

    return {
      message: 'Sent successfully',
    };
  }
}
