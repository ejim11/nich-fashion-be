import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './providers/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CreateProductProvider } from './providers/create-product.provider';
import { UploadsModule } from 'src/uploads/uploads.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), UploadsModule],
  controllers: [ProductsController],
  providers: [ProductsService, CreateProductProvider],
})
export class ProductsModule {}
