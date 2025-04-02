import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Discount } from '../discounts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { DiscountsUsageService } from 'src/discounts-usage/providers/discounts-usage.service';

@Injectable()
export class ApplyForDiscountProvider {
  constructor(
    /**
     * injecting the discounts repository
     */
    @InjectRepository(Discount)
    private readonly discountsRepository: Repository<Discount>,

    /**
     * injecting the discounts usage service
     */
    private readonly discountsUsageService: DiscountsUsageService,
  ) {}

  /**
   * @function checks the validity of the code and how many times the user has used it
   * @param user
   * @param code
   * @returns discount
   */
  public async applyForDiscount(user: ActiveUserData, code: string) {
    let discount: Discount;

    try {
      discount = await this.discountsRepository.findOne({
        where: {
          code,
          validFrom: LessThanOrEqual(new Date()),
          validUntil: MoreThanOrEqual(new Date()),
        },
      });
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    //Handle the discount does not exist
    if (!discount) {
      throw new BadRequestException(
        'The discount code has expired or does not exist',
      );
    }

    // check the usage count
    const usageCount = await this.discountsUsageService.countDiscountUsage(
      discount.id,
      user.sub,
    );

    if (usageCount >= discount.usageLimit) {
      return null;
    }

    return discount;
  }
}
