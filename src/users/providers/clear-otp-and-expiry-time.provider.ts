import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClearOtpAndExpiryTimeProvider {
  /**
   * constructor
   * @param usersRepository
   */
  constructor(
    /**
     * injecting the users repository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * function for clearing otp after login
   * @param user
   * @returns user
   */
  public async clearOtpAndExpiryTime(user: User) {
    const newUserObj = {
      ...user,
      otp: null,
      otpExpire: null,
    };

    try {
      return await this.usersRepository.save(newUserObj);
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }
}
