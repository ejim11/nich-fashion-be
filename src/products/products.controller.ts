import { Body, Controller, Post, UploadedFiles } from '@nestjs/common';
import { CreateProductDto } from './dtos/createProductDto';
import { ActiveUser } from 'src/auth/decorator/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Controller('products')
export class ProductsController {
  // create a resource for the productItem

  @Post()
  public createProduct(
    @Body() createProductDto: CreateProductDto,
    @ActiveUser() user: ActiveUserData,
    @UploadedFiles() files: { images?: Express.Multer.File[] },
  ) {}
}
