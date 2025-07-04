import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { SignInDto } from '../dtos/sign-in.dto';
import { UsersService } from 'src/users/providers/users.service';
import { randomInt } from 'crypto';
import * as crypto from 'crypto';
import { MailService } from 'src/mail/providers/mail.service';

/**
 * provider for sigining in users
 */
@Injectable()
export class SignInProvider {
  /**
   * constructor
   * @param usersService
   * @param hashingProvider
   * @param generateTokenProvider
   */
  constructor(
    /**
     * injecting the user service
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    /**
     * injecting the mail service
     */
    private readonly mailService: MailService,
  ) {}

  /**
   * function for signing in users
   * @param signInDto
   * @returns access and refresh tokens
   */
  public async signIn(signInDto: SignInDto) {
    // find  the user using the email ID
    // throw an exception if the user does not exist

    let user: any;
    user = await this.usersService.findOneByEmail(signInDto.email);

    // if user does not exist already, create user
    if (!user) {
      user = await this.usersService.createUser({
        email: signInDto.email,
        role: signInDto.role,
      });
    }

    // generate otp
    const otp = randomInt(100000, 999999);

    const hashedOtp = crypto
      .createHash('sha256')
      .update(otp.toString())
      .digest('hex');

    // store the otp in the db
    await this.usersService.storeTokenOtpAndOtpExpire(user, hashedOtp);

    try {
      await this.mailService.sendLoginOtp(user, otp.toString());
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException(error);
    }

    return {
      user: {
        id: user.id,
        role: user.role,
        email: user.email,
      },
    };
  }
}
