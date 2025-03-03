/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

/**
 * provider class for creating user
 */
@Injectable()
export class CreateUsersProvider {
  /**
   * constructor
   * @param usersRepository
   * @param hashingProvider
   * @param mailService
   */
  constructor(
    /**
     * inhjecting the user repository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * function for creating user
   * @param createUserDto
   * @returns created user
   */
  public async createUser(createUserDto: CreateUserDto) {
    // create a new user
    let newUser = this.usersRepository.create({
      ...createUserDto,
    });

    // save the user to the db
    try {
      newUser = await this.usersRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    return {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    };
  }
}
