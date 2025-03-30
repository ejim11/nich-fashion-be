import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { DeliveryStatesService } from './providers/delivery-states.service';
import { CreateDeliveryStateDto } from './dtos/create-delivery-state.dto';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/enums/role-type.enum';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { UpdateDeliveryStateDto } from './dtos/update-delivery-state.dto';

@Controller('delivery-states')
export class DeliveryStatesController {
  constructor(
    /**
     * injecting the delivery states service
     */
    private readonly deliveryStatesService: DeliveryStatesService,
  ) {}

  /**
   * @function creates a delivery state
   * @param createDeliveryStateDto
   */
  @Post()
  @Roles(Role.ADMIN)
  public createDeliveryState(
    @Body() createDeliveryStateDto: CreateDeliveryStateDto,
  ) {
    return this.deliveryStatesService.createDeliveryState(
      createDeliveryStateDto,
    );
  }

  /**
   * @function finds a delivery state by name
   * @param state
   * @returns delivery state
   */
  @Auth(AuthType.None)
  @Get('/:state')
  public findDeliveryStateByState(@Param('state') state: string) {
    return this.deliveryStatesService.findDeliveryStateByName(state);
  }

  /**
   * @function updates a delivery state
   * @param updateDeliveryStateDto
   * @returns updated delivery state
   */
  @Roles(Role.ADMIN)
  @Patch('/:stateId')
  public updateDeliveryState(
    @Param('stateId') stateId: string,
    @Body() updateDeliveryStateDto: UpdateDeliveryStateDto,
  ) {
    return this.deliveryStatesService.updateDeliveryState(
      stateId,
      updateDeliveryStateDto,
    );
  }
}
