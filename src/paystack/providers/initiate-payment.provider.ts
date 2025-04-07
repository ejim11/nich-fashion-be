import {
  ConflictException,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InitiatePaymentDto } from '../dtos/initiate-payment.dto';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import paystackConfig from '../config/paystack.config';
import { ConfigService, ConfigType } from '@nestjs/config';
import { DataSource } from 'typeorm';
import axios from 'axios';
import { UsersService } from 'src/users/providers/users.service';
import { Payment } from 'src/payments/payment.entity';
import { paymentStatus } from 'src/payments/enums/paymentStatus.enum';
import { User } from 'src/users/user.entity';
import { ProductVariantsService } from 'src/product-variants/providers/product-variants.service';
import { Discount } from 'src/discounts/discounts.entity';
import { PaymentMethod } from 'src/payments/enums/payment-method.enum';

@Injectable()
export class InitiatePaymentProvider {
  constructor(
    /**
     * injecting the paystack config
     */
    @Inject(paystackConfig.KEY)
    private readonly paystackConfiguration: ConfigType<typeof paystackConfig>,

    /**
     * Injecting datasource
     */
    private readonly dataSource: DataSource,

    /**
     * injecting the users service
     */
    private readonly usersService: UsersService,

    /**
     * injecting config service
     */
    private readonly configService: ConfigService,

    /**
     * injecting the product variants service
     */
    private readonly productVariantsService: ProductVariantsService,
  ) {}

  /**
   * function for getting the auth header
   * @returns authorization header for paystack
   */
  private getAuthHeader() {
    return { Authorization: `Bearer ${this.paystackConfiguration.secret}` };
  }

  public async initializePayment(
    initiatePaymentDto: InitiatePaymentDto,
    user: ActiveUserData,
  ) {
    // start transaction
    // create Query Runner instance
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      // connect query runner to datasource
      await queryRunner.connect();

      // start transaction
      await queryRunner.startTransaction();
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException('Could not connect to datasource');
    }

    // find the user
    const buyer: User = await this.usersService.findOneById(user.sub);

    let discount: Discount;
    // find the discount if there is one
    if (initiatePaymentDto.discountId) {
      discount = await queryRunner.manager.findOne(Discount, {
        where: { id: initiatePaymentDto.discountId },
      });
    }

    // user info should have details about address but if there is a set delivery address then use that
    const deliveryAddress =
      initiatePaymentDto.deliveryAddress ??
      `${buyer.streetAddress}, ${buyer.city}, ${buyer.state}`;

    const deliveryPicker =
      initiatePaymentDto.deliveryPicker ??
      `${buyer.firstName} ${buyer.lastName}`;

    // calculate the total amount
    let totalAmount = initiatePaymentDto.products
      .map((prd) => {
        // loop through inner variants
        const totalQty = prd.variants
          .map((vr) => vr.quantity)
          .reduce((acc, cur) => cur + acc, 0);

        return prd.price * totalQty;
      })
      .reduce((acc, cur) => acc + cur, 0);

    totalAmount = initiatePaymentDto.discountId
      ? totalAmount - (discount.percentOff / 100) * totalAmount
      : totalAmount;

    // initialize payment
    let response;

    try {
      // Iterate through each product in the request
      for (const product of initiatePaymentDto.products) {
        const { productId, variants } = product;

        // Iterate through each variant the user wants to buy
        for (const variantDto of variants) {
          const { id: variantId, quantity } = variantDto;

          // check availability
          await this.productVariantsService.checkVariantAvailability(
            queryRunner.manager,
            variantId,
            productId,
            quantity,
          );
        }
      }

      response = await axios.post(
        `${this.paystackConfiguration.baseUrl}/transaction/initialize`,
        {
          email: buyer.email,
          metadata: {
            products: initiatePaymentDto.products,
            user: buyer,
            deliveryAddress,
            deliveryPicker,
            totalAmount,
            discount: discount ?? {},
          },
          amount: totalAmount * 100,
          callback_url: `${this.configService.get('appConfig.host')}/collections?success=yes`,
        }, // Paystack accepts amounts in kobo
        { headers: this.getAuthHeader() },
      );

      // Create payment record
      await queryRunner.manager.save(Payment, {
        userId: buyer.id,
        amount: totalAmount,
        provider: 'paystack',
        method: PaymentMethod.ONLINE,
        providerReference: response.data.data.reference,
        status: paymentStatus.PENDING,
        authorizationUrl: response.data.data.authorization_url,
      });

      // if successful commit
      // ensures the txn is committed to the db
      await queryRunner.commitTransaction();

      return response.data;
    } catch (error) {
      // we rollback the txn here if it is not successful
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Could not complete the transaction', {
        description: String(error),
      });
    } finally {
      // relsease the connection
      // release connection whether it was successful or not
      try {
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException('Could not release the connection', {
          description: String(error),
        });
      }
    }
  }
}
