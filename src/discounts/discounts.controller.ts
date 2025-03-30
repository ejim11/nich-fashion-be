import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { DiscountsService } from './providers/discounts.service';
import { CreateDiscountDto } from './dtos/create-discount.dto';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/enums/role-type.enum';
import { ActiveUser } from 'src/auth/decorator/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { ApplyForDiscountDto } from './dtos/apply-for-discount.dto';

@Controller('discounts')
export class DiscountsController {
  constructor(
    /**
     * injecting the discounts service
     */
    private readonly discountsService: DiscountsService,
  ) {}

  @Post()
  @Roles(Role.ADMIN)
  public createDiscount(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountsService.createDiscount(createDiscountDto);
  }

  @Post('/apply')
  @Roles(Role.USER)
  @HttpCode(HttpStatus.OK)
  public applyForDiscount(
    @ActiveUser() user: ActiveUserData,
    @Body() applyForDiscountDto: ApplyForDiscountDto,
  ) {
    return this.discountsService.applyForDiscount(
      user,
      applyForDiscountDto.code,
    );
  }
}
