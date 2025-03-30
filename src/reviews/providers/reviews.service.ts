import { Injectable } from '@nestjs/common';
import { CreateReviewProvider } from './create-review.provider';
import { CreateReviewDto } from '../dtos/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    /**
     * injecting the create review provider
     */
    private readonly createReviewProvider: CreateReviewProvider,
  ) {}

  /**
   * @function creates a review
   * @param createReviewDto
   * @param productId
   * @returns a review
   */
  public async createReview(createReviewDto: CreateReviewDto): Promise<{
    id: string;
    reviewer: string;
    stars: number;
    review: string;
    dateCreated: Date;
    product: string;
  }> {
    return this.createReviewProvider.createReview(createReviewDto);
  }
}
