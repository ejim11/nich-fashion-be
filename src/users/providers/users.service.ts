import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUsersProvider } from './create-users.provider';
import { CreateUserDto } from '../dtos/create-user.dto';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { StoreOtpAndExpireProvider } from './store-otp-and-expire.provider';
import { User } from '../user.entity';
import { FindUserByOtpAndExpiryTimeProvider } from './find-user-by-reset-otp-and-expiry-time.provider';

import { FindOneByIdProvider } from './find-one-by-id.provider';
import { GetUsersDto } from '../dtos/get-user.dto';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClearOtpAndExpiryTimeProvider } from './clear-otp-and-expiry-time.provider';
import { PatchUserDto } from '../dtos/patch-user.dto';

/**
 * service provider for the user module
 * injectable
 */
@Injectable()
export class UsersService {
  /**
   * constructor
   * @param createUserProvider
   * @param findOneUserByEmailProvider
   * @param storeOtpAndExpiresProvider
   * @param findUserByResetOtpAndExpiresProvider
   * @param changeUserPasswordProvider
   * @param findOneByIdProvider
   * @param paginationprovider
   * @param usersRepository
   */
  constructor(
    /**
     * injecting the create user provider
     */
    private readonly createUserProvider: CreateUsersProvider,

    /**
     * Injecting the findOneUserByEmailProvider
     */
    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,

    /**
     * injecting the store otp and expires provider
     */
    private readonly storeOtpAndExpiresProvider: StoreOtpAndExpireProvider,

    /**
     * injecting the find user by reset otp and expires provider
     */
    private readonly findUserByOtpAndExpiresProvider: FindUserByOtpAndExpiryTimeProvider,

    /**
     * injecting the find one by id provider
     */
    private readonly findOneByIdProvider: FindOneByIdProvider,

    /**
     * injecting the pagination provider
     */
    private readonly paginationprovider: PaginationProvider,

    /**
     * injecting the user repository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    /**
     * injecting the clear otp and expiry time provider
     */
    private readonly clearOtpAndExpiryTimeProvider: ClearOtpAndExpiryTimeProvider,
  ) {}

  /**
   * function for creating a new user
   * @param createUserDto
   * @returns the create user
   */
  public async createUser(createUserDto: CreateUserDto) {
    return await this.createUserProvider.createUser(createUserDto);
  }

  /**
   * function for getting the user based on the email
   * @param email
   * @returns a user based on the email
   */
  public async findOneByEmail(email: string) {
    return this.findOneUserByEmailProvider.findOneByEmail(email);
  }

  /**
   * function for storing the reset token and expiry date of the token
   * @param user
   * @param token
   * @returns a user with stored reset token and expiry date
   */
  public async storeTokenOtpAndOtpExpire(user: User, token: string) {
    return await this.storeOtpAndExpiresProvider.storeOtpAndExpire(user, token);
  }

  /**
   * function for getting the user based on the stored reset token and expiry date
   * @param otp
   * @returns the user based on the stored reset token and expiry date
   */
  public async findUserByResetOtpAndExpiryTime(otp: string) {
    return await this.findUserByOtpAndExpiresProvider.findUserByOtpAndExpiryTime(
      otp,
    );
  }

  /**
   * function for clearing otp after login
   * @param user
   * @returns user
   */
  public async clearOtpAndExpiryTime(user: User) {
    return await this.clearOtpAndExpiryTimeProvider.clearOtpAndExpiryTime(user);
  }

  /**
   * function for getting the user based on id
   * @param id
   * @returns user based on the user id
   */
  public async findOneById(id: string) {
    return await this.findOneByIdProvider.findById(id);
  }

  /**
   * function for getting all users
   * @param userQuery
   * @returns all users
   */
  public async findAll(userQuery: GetUsersDto): Promise<Paginated<User>> {
    try {
      const user = this.paginationprovider.paginationQuery(
        {
          limit: userQuery.limit,
          page: userQuery.page,
        },
        this.usersRepository,
        {
          relations: null,
        },
      );

      return user;
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }

  /**
   * a function for deleting a user
   * @param userId
   * @returns a message on successful deletion
   */
  public async deleteUser(userId: string) {
    try {
      await this.usersRepository.delete(userId);
      return {
        message: `User ${userId}, was successfully deleted`,
      };
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }

  public async updateUser(id: string, patchUserDto: PatchUserDto) {
    let user;
    // find the user
    try {
      user = await this.usersRepository.findOneBy({
        id: id,
      });
    } catch (err) {
      throw new RequestTimeoutException(err);
    }
    if (!user) {
      throw new BadRequestException('User does not exist');
    }
    // update user
    user = { ...user, ...patchUserDto };

    try {
      await this.usersRepository.save(user);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    return user;
  }
}
