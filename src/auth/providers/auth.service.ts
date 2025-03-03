import { Injectable } from '@nestjs/common';
import { SignInDto } from 'src/auth/dtos/sign-in.dto';
import { SignInProvider } from './sign-in.provider';
import { RefreshTokenDto } from 'src/auth/dtos/refresh-token.dto';
import { RefreshTokenProvider } from './refresh-token.provider';
import { OtpSigninDto } from '../dtos/otpSignin.dto';
import { OtpSigninProvider } from './otp-signin.provider';

/**
 * auth service for the auth module
 */
@Injectable()
export class AuthService {
  /**
   * constructor
   * @param signInProvider
   * @param forgotPasswordProvider
   * @param resetPasswordProvider
   * @param refreshTokenProvider
   */
  constructor(
    /**
     * injecting the sign in provider
     */
    private readonly signInProvider: SignInProvider,

    /**
     * injecting the otp sign in provider
     */
    private readonly otpSigninProvider: OtpSigninProvider,

    /**
     * injecting the refresh token provider
     */
    private readonly refreshTokenProvider: RefreshTokenProvider,
  ) {}

  /**
   * function for signing in a user
   * @param signInDto
   * @returns access and refresh tokens
   */
  public async signIn(signInDto: SignInDto) {
    return await this.signInProvider.signIn(signInDto);
  }

  /**
   * function for resetting password
   * @param resetPasswordDto
   * @returns user
   */
  public async otpSignin(otpSigninDto: OtpSigninDto) {
    return await this.otpSigninProvider.signInWithOtp(otpSigninDto);
  }

  /**
   * function for refreshing access token after it expires
   * @param refreshTokenDto
   * @returns access and refresh tokens
   */
  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    return await this.refreshTokenProvider.refreshTokens(refreshTokenDto);
  }
}
