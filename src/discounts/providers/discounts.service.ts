import { Injectable } from '@nestjs/common';
import { CreateDiscountDto } from '../dtos/create-discount.dto';
import { CreateDiscountProvider } from './create-discount.provider';
import { Discount } from '../discounts.entity';
import { ApplyForDiscountProvider } from './apply-for-discount.provider';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Injectable()
export class DiscountsService {
  constructor(
    /**
     * injecting the create discount provider
     */
    private readonly createDiscountProvider: CreateDiscountProvider,

    /**
     * injecting the apply for discount provider
     */
    private readonly applyForDiscountProvider: ApplyForDiscountProvider,
  ) {}

  /**
   * @function creates a discount
   * @param createDiscountDto
   * @returns created discount object
   */
  public async createDiscount(
    createDiscountDto: CreateDiscountDto,
  ): Promise<Discount> {
    return await this.createDiscountProvider.createDiscount(createDiscountDto);
  }

  /**
   * @function checks the validity of the code and how many times the user has used it
   * @param user
   * @param code
   * @returns discount
   */
  public async applyForDiscount(user: ActiveUserData, code: string) {
    return await this.applyForDiscountProvider.applyForDiscount(user, code);
  }
}
