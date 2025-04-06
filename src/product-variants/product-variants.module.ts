import { Module } from '@nestjs/common';
import { ProductVariantsService } from './providers/product-variants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductVariant } from './product-variants.entity';
import { ProductVariantsController } from './product-variants.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductVariant])],
  providers: [ProductVariantsService],
  exports: [ProductVariantsService],
  controllers: [ProductVariantsController],
})
export class ProductVariantsModule {}
