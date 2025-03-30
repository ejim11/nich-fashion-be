import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DiscountUsage } from '../discounts-usage.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DiscountsUsageService {
  constructor(
    /**
     * injecting the discounts usage repository
     */
    @InjectRepository(DiscountUsage)
    private readonly discountsUsageRepository: Repository<DiscountUsage>,
  ) {}

  /**
   * @function gets the discount usage count of a user
   * @param discountId
   * @param userId
   * @returns discount usage count by a user
   */
  public async countDiscountUsage(discountId: string, userId: string) {
    let usageCount;
    try {
      // Check usage limit
      usageCount = await this.discountsUsageRepository.count({
        where: {
          discount: { id: discountId },
          user: { id: userId },
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    return usageCount;
  }
}
