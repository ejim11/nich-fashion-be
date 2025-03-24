import { Module } from '@nestjs/common';
import { ProductImagesService } from './providers/product-images.service';

@Module({
  providers: [ProductImagesService],
})
export class ProductImagesModule {}
