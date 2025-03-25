import { Module } from '@nestjs/common';
import { ProductImagesService } from './providers/product-images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from './product-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImage])],
  providers: [ProductImagesService],
})
export class ProductImagesModule {}
