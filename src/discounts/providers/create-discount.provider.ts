import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from '../discounts.entity';
import { Repository } from 'typeorm';
import { CreateDiscountDto } from '../dtos/create-discount.dto';

@Injectable()
export class CreateDiscountProvider {
  constructor(
    /**
     * injecting the discounts repository
     */
    @InjectRepository(Discount)
    private readonly discountsRepository: Repository<Discount>,
  ) {}

  /**
   * @function creates a discount
   * @param createDiscountDto
   * @returns discount obj
   */
  public async createDiscount(
    createDiscountDto: CreateDiscountDto,
  ): Promise<Discount> {
    let discount = this.discountsRepository.create(createDiscountDto);

    // save the discount to the db
    try {
      discount = await this.discountsRepository.save(discount);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    return discount;
  }
}
