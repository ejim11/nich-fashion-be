import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './providers/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CreateProductProvider } from './providers/create-product.provider';
import { UploadsModule } from 'src/uploads/uploads.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { ProductVariantsModule } from 'src/product-variants/product-variants.module';
import { FindAllProductsProvider } from './providers/find-all-products.provider';
import { UpdateProductProvider } from './providers/update-product.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    UploadsModule,
    PaginationModule,
    ProductVariantsModule,
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    CreateProductProvider,
    FindAllProductsProvider,
    UpdateProductProvider,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
