import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './providers/reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './reviews.entity';
import { CreateReviewProvider } from './providers/create-review.provider';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), ProductsModule],
  controllers: [ReviewsController],
  providers: [ReviewsService, CreateReviewProvider],
})
export class ReviewsModule {}
