import { Module } from '@nestjs/common';
import { ProductVariantsService } from './providers/product-variants.service';

@Module({
  providers: [ProductVariantsService],
})
export class ProductVariantsModule {}
