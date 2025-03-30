import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ReviewsService } from './providers/reviews.service';
import { CreateReviewDto } from './dtos/create-review.dto';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/enums/role-type.enum';

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

  /**
   * @function deletes a product
   * @param productId
   * @returns a message that the item was successfully deleted
   */
  @Delete('/:reviewId')
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT) // This set
  public deleteProduct(
    @Param('reviewId') reviewId: string,
  ): Promise<{ message: string }> {
    return this.reviewsService.deleteReview(reviewId);
  }
}
