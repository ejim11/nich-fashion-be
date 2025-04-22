import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { DeliveryState } from '../delivery-state.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDeliveryStateDto } from '../dtos/create-delivery-state.dto';
import { UpdateDeliveryStateDto } from '../dtos/update-delivery-state.dto';

@Injectable()
export class DeliveryStatesService {
  constructor(
    /**
     * injecting the delivery states repository
     */
    @InjectRepository(DeliveryState)
    private readonly deliveryStateRepository: Repository<DeliveryState>,
  ) {}

  /**
   * @function creates a delivery state resource
   * @param createDeliveryStateDto
   * @returns delivery state
   */
  public async createDeliveryState(
    createDeliveryStateDto: CreateDeliveryStateDto,
  ) {
    let deliveryState: DeliveryState;

    deliveryState = this.deliveryStateRepository.create(createDeliveryStateDto);

    try {
      deliveryState = await this.deliveryStateRepository.save(deliveryState);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    return deliveryState;
  }

  /**
   * @function finds a delivery state based on the state
   * @param state
   * @returns delivery state
   */
  public async findDeliveryStateByName(state: string) {
    let deliveryState;
    try {
      deliveryState = await this.deliveryStateRepository.findOneBy({
        state: state,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: any) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    /**
     * Handle the delivery state does not exist
     */
    if (!deliveryState) {
      return {
        message: 'The delivery state does not exist',
      };
    }
    return deliveryState;
  }

  /**
   * @function updates a delivery state
   * @param updateDeliveryStateDto
   * @returns updated delivery state
   */
  public async updateDeliveryState(
    stateId: string,
    updateDeliveryStateDto: UpdateDeliveryStateDto,
  ) {
    let deliveryState;
    // find the user
    try {
      deliveryState = await this.deliveryStateRepository.findOneBy({
        id: stateId,
      });
    } catch (err) {
      throw new RequestTimeoutException(err);
    }
    if (!deliveryState) {
      throw new BadRequestException('Delivery state does not exist');
    }
    // update user
    deliveryState = { ...deliveryState, ...updateDeliveryStateDto };

    try {
      await this.deliveryStateRepository.save(deliveryState);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    return deliveryState;
  }
}
