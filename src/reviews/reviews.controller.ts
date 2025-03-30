import { Body, Controller, Post } from '@nestjs/common';
import { ReviewsService } from './providers/reviews.service';
import { CreateReviewDto } from './dtos/create-review.dto';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

@Controller('reviews')
export class ReviewsController {
  constructor(
    /**
     * injecting the reviews service
     */
    private readonly reviewsService: ReviewsService,
  ) {}

  /**
   * @function creates a review
   * @param createReviewDto
   * @returns review
   */
  @Post('')
  @Auth(AuthType.None)
  public createReview(@Body() createReviewDto: CreateReviewDto): Promise<{
    id: string;
    reviewer: string;
    stars: number;
    review: string;
    dateCreated: Date;
    product: string;
  }> {
    return this.reviewsService.createReview(createReviewDto);
  }
}
