import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateReviewDto } from '../dtos/create-review.dto';
import { Review } from '../reviews.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/providers/products.service';

@Injectable()
export class CreateReviewProvider {
  constructor(
    /**
     * injecting the reviews repository
     */
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,

    /**
     * injecting the products service
     */
    private readonly productsService: ProductsService,
  ) {}

  /**
   * @function creates a review
   * @param createReviewDto
   * @param productId
   * @returns  a review
   */
  public async createReview(createReviewDto: CreateReviewDto): Promise<{
    id: string;
    reviewer: string;
    stars: number;
    review: string;
    dateCreated: Date;
    product: string;
  }> {
    // find product
    const product = await this.productsService.findProductById(
      createReviewDto.productId,
    );

    // create a new review
    let newReview = this.reviewsRepository.create({
      reviewer: createReviewDto.reviewer,
      review: createReviewDto.review,
      stars: createReviewDto.stars,
      product: product,
    });

    // save the review to the db
    try {
      newReview = await this.reviewsRepository.save(newReview);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    return {
      id: newReview.id,
      reviewer: newReview.reviewer,
      stars: newReview.stars,
      review: newReview.review,
      dateCreated: newReview.dateCreated,
      product: newReview.product.id,
    };
  }
}
