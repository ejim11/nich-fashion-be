import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { ProductsWithVariantsDto } from './dto/products-with-variants.dto';
import { ProductVariantsService } from './providers/product-variants.service';

@Controller('product-variants')
export class ProductVariantsController {
  constructor(
    /**
     * injecting the products variants service
     */
    private readonly productVariantsService: ProductVariantsService,
  ) {}

  @Post('/check-availability')
  @Auth(AuthType.None)
  @HttpCode(HttpStatus.OK)
  public checkProductVariantAvailability(
    @Body() productsWithVariantsDto: ProductsWithVariantsDto,
  ) {
    return this.productVariantsService.checkvVariantAvailabilityForTransfers(
      productsWithVariantsDto,
    );
  }
}
