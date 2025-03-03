import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { SignInDto } from './dtos/sign-in.dto';
import { AuthService } from './providers/auth.service';
import { Auth } from './decorator/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OtpSigninDto } from './dtos/otpSignin.dto';

/**
 * controller for the auth route
 */
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  /**
   * constructor
   * @param authService
   */
  constructor(
    /**
     * injecting the auth service
     */
    private readonly authService: AuthService,
  ) {}

  /**
   * route for sign in
   * @param signInDto
   * @returns access token and refresh token
   */
  @ApiOperation({
    summary: 'It signs in a user with valid email and password',
  })
  @ApiResponse({
    status: 200,
    description: 'User is signed in successfully',
    example: {
      summary: 'Access and refresh token',
      value: {
        accessToken: 'jsbfiwhvfquobdfj',
        refreshToken: 'jsbfiwhvfquobdfj',
      },
    },
  })
  @ApiBody({
    description: 'Signs in a user',
    required: true,
    type: SignInDto,
    examples: {
      example1: {
        summary: 'Valid request example',
        value: {
          email: 'iloghaluagneskc@gmail.com',
          password: '@Password1',
        },
      },
      example2: {
        summary: 'Invalid request example (missing password)',
        value: {
          email: 'iloghaluagneskc@gmail.com',
        },
      },
    },
  })
  @Post('/sign-in')
  @Auth(AuthType.None)
  @HttpCode(HttpStatus.OK)
  public signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  /**
   * route for otp signin
   */
  @ApiOperation({
    summary: 'It signs in the user with a valid otp',
  })
  @ApiResponse({
    status: 200,
    description: 'Login Successfully',
    example: {
      value: {
        message: 'Login successfully',
      },
    },
  })
  @ApiBody({
    description: 'Contains the  otp',
    required: true,
    type: OtpSigninDto,
    examples: {
      example1: {
        summary: 'Valid request example',
        value: {
          otp: 2354,
        },
      },
      example2: {
        summary: 'Invalid request example (missing otp)',
        value: {},
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Auth(AuthType.None)
  @Patch('/otp-signin')
  public otpSignin(@Body() otpSigninDto: OtpSigninDto) {
    return this.authService.otpSignin(otpSigninDto);
  }

  /**
   * route for refresh tokens
   */
  @ApiOperation({
    summary: 'It creates  new access and refresh tokens',
  })
  @ApiResponse({
    status: 200,
    description: 'Access and refresh tokens are created successfully',
    example: {
      value: {
        accessToken: 'jsbfiwhvfquobdfj',
        refreshToken: 'jsbfiwhvfquobdfj',
      },
    },
  })
  @ApiBody({
    description: 'Contains the refresh token',
    required: true,
    type: RefreshTokenDto,
    examples: {
      example1: {
        summary: 'Valid request example',
        value: {
          refreshToken: 'jbfwihfubfjkebiejhfbw',
        },
      },
      example2: {
        summary: 'Invalid request example (missing refresh token)',
        value: {},
      },
    },
  })
  @Post('refresh-tokens')
  @HttpCode(HttpStatus.OK)
  @Auth(AuthType.None)
  public async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    // console.log('re', refreshTokenDto);
    return await this.authService.refreshTokens(refreshTokenDto);
  }
}
