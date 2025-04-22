import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ContactUsDto } from './dtos/contact-us.dto';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { ContactUsService } from './providers/contact-us.service';

@Controller('contact-us')
export class ContactUsController {
  constructor(
    /**
     * injecting the contact us service
     */
    private readonly contactUsService: ContactUsService,
  ) {}

  @Auth(AuthType.None)
  @Post()
  @HttpCode(HttpStatus.OK)
  public contactUs(@Body() contactUsDto: ContactUsDto) {
    return this.contactUsService.contactUs(contactUsDto);
  }
}
