import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { OtpSigninDto } from '../dtos/otpSignin.dto';
import * as crypto from 'crypto';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class OtpSigninProvider {
  constructor(
    /**
     * injecting users service
     */
    private readonly usersService: UsersService,

    /**
     * injecting the generateToken Provider
     */
    private readonly generateTokenProvider: GenerateTokensProvider,
  ) {}

  public async signInWithOtp(otpSigninDto: OtpSigninDto) {
    // get the otp and hash it
    const hashedOtp = crypto
      .createHash('sha256')
      .update(otpSigninDto.otp.toString())
      .digest('hex');

    // find the user based on the hased otp and timestamp
    const user =
      await this.usersService.findUserByResetOtpAndExpiryTime(hashedOtp);

    // clear the otp and expiry time
    await this.usersService.clearOtpAndExpiryTime(user);

    // send access token and refresh token
    // // generate an access token
    const { accessToken, refreshToken } =
      await this.generateTokenProvider.generateTokens(user);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        city: user.city,
        country: user.country,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        state: user.state,
        streetAddress: user.streetAddress,
        zipCode: user.zipCode,
      },
    };
  }
}
