import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateReviewProvider } from './create-review.provider';
import { CreateReviewDto } from '../dtos/create-review.dto';
import { Repository } from 'typeorm';
import { Review } from '../reviews.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    /**
     * injecting the create review provider
     */
    private readonly createReviewProvider: CreateReviewProvider,

    /**
     * injecting the reviews repository
     */
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
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

  /**
   * @function deletes a review
   * @param reviewId
   * @returns a message that the review was successfully deleted
   */
  public async deleteReview(reviewId: string): Promise<{ message: string }> {
    try {
      await this.reviewsRepository.delete(reviewId);
      return {
        message: `Product ${reviewId}, was successfully deleted`,
      };
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }
}
