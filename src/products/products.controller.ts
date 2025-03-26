import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductDto } from './dtos/createProductDto';
import { ApiConsumes } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/enums/role-type.enum';
import { ProductsService } from './providers/products.service';

@Controller('products')
export class ProductsController {
  constructor(
    /**
     * injecting the products service
     */
    private readonly productsService: ProductsService,
  ) {}

  /**
   * @function createProduct
   * @param createProductDto
   * @param user
   * @param files
   */
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      // Dynamically generate interceptor fields
      Array.from({ length: 10 }, (_, i) => ({
        name: `variants[${i}][images]`,
        maxCount: 6,
      })),
    ),
  )
  @Roles(Role.ADMIN)
  @Post()
  public createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: { [key: string]: Express.Multer.File[] },
  ) {
    return this.productsService.createProduct(createProductDto, files);
  }
}
