import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductDto } from './dtos/createProductDto';
import {
  ApiConsumes,
  ApiHeaders,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/enums/role-type.enum';
import { ProductsService } from './providers/products.service';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { GetProductsDto } from './dtos/get-product.dto';
import { PatchProductDto } from './dtos/patch-product.dto';

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
      Array.from({ length: 6 }, (_, i) => ({
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

  /**
   * route for getting a product by the product id
   * @param eventId
   * @returns a particular event
   */
  @ApiOperation({
    summary: 'It finds a product based on its id',
  })
  @ApiResponse({
    status: 200,
    description: 'Product is fetched successfully based on its id',
  })
  @ApiParam({
    name: 'eventId',
    required: true,
    type: String,
    description: 'The unique identifier of the product',
    example: '12345',
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'Bearer token for authorization',
    },
    {
      name: 'X-Custom-Header',
      required: false,
      description: 'A custom optional header',
    },
  ])
  @Auth(AuthType.None)
  @Get('/:productId')
  public findProductById(@Param('productId') productId: string) {
    return this.productsService.findProductById(productId);
  }

  /**
   * route for getting all products
   * @param productQuery
   * @returns all products
   */
  @ApiOperation({
    summary: 'It finds all products ',
  })
  @ApiResponse({
    status: 200,
    description: 'All products are fetched and paginated',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'The number of entries returned per query',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description:
      'The position of the page number that you want the api to return',
    example: 1,
  })
  @Auth(AuthType.None)
  @Get('')
  public findAllProducts(@Query() productQuery: GetProductsDto) {
    return this.productsService.findAll(productQuery);
  }

  /**
   * @function updates a product
   * @param productId
   * @param patchProductDto
   * @returns updated product
   */
  @Patch('/:productId')
  @Roles(Role.ADMIN)
  public patchProduct(
    @Param('productId') productId: string,
    @Body() patchProductDto: PatchProductDto,
  ) {
    return this.productsService.updateProduct(productId, patchProductDto);
  }

  /**
   * @function deletes a product
   * @param productId
   * @returns a message that the item was successfully deleted
   */
  @Delete('/:productId')
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT) // This set
  public deleteProduct(
    @Param('productId') productId: string,
  ): Promise<{ message: string }> {
    return this.productsService.deleteProduct(productId);
  }
}
