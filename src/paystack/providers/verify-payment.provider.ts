import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import paystackConfig from '../config/paystack.config';
import { ConfigType } from '@nestjs/config';
import { DataSource } from 'typeorm';
import * as crypto from 'crypto';
import axios from 'axios';
import { Payment } from 'src/payment/payment.entity';
import { paymentStatus } from 'src/payment/enums/paymentStatus.enum';
import { ProductVariantsService } from 'src/product-variants/providers/product-variants.service';
import { Order } from 'src/orders/order.entity';
import { ProductsService } from 'src/products/providers/products.service';
import { DiscountUsage } from 'src/discounts-usage/discounts-usage.entity';
import { MailService } from 'src/mail/providers/mail.service';

@Injectable()
export class VerifyPaymentProvider {
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
     * injecting the product variants service
     */
    private readonly productVariantsService: ProductVariantsService,

    /**
     * injecting the products service
     */
    private readonly productsService: ProductsService,

    /**
     * injecting the mail service
     */
    private readonly mailService: MailService,
  ) {}

  /**
   * @function for getting the auth header
   * @returns authorization header for paystack
   */
  private getAuthHeader() {
    return { Authorization: `Bearer ${this.paystackConfiguration.secret}` };
  }

  /**
   * function for verifying the payment
   * @param reference
   * @returns data after payment
   */
  private async verifyPayment(reference: string): Promise<any> {
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
    try {
      // send request to verify payment
      const response = await axios.get(
        `${this.paystackConfiguration.baseUrl}/transaction/verify/${reference}`,
        { headers: this.getAuthHeader() },
      );

      const {
        products,
        user,
        deliveryAddress,
        deliveryPicker,
        totalAmount,
        discount,
      } = response.data.data.metadata;

      const prdsDb = await Promise.all(
        products
          .map((prd) => prd.productId)
          .map(
            async (prdId) => await this.productsService.findProductById(prdId),
          ),
      );

      // Get purchase by payment reference
      const payment = await queryRunner.manager.findOne(Payment, {
        where: { providerReference: reference },
      });

      if (!payment) {
        throw new Error('Purchase not found');
      }

      if (response.data.data.status === 'success') {
        // Update payment status
        payment.status = paymentStatus.SUCCESS;

        // create order
        const order = await queryRunner.manager.save(Order, {
          userId: user.id,
          deliveryAddress: deliveryAddress,
          totalAmount: totalAmount,
          deliveryPicker: deliveryPicker,
          products: prdsDb,
        });

        // if there is a discount the add it to the discount usage
        if (discount.id) {
          // create the discount usage
          const discountUsage = await queryRunner.manager.save(DiscountUsage, {
            user: user,
            discount: discount,
            order: order,
          });

          // add the discount applied to the order
          order.discountApplied = discount.percentOff;

          // add the discount usage to the order
          order.discountUsage = discountUsage;

          // save both the discount usage and order
          await queryRunner.manager.save(Order, order);
          await queryRunner.manager.save(DiscountUsage, discountUsage);
        }
      } else {
        // Payment failed
        payment.status = paymentStatus.FAILED;

        // rollback
        for (const product of products) {
          const { productId, variants } = product;

          // Iterate through each variant the user wants to buy
          for (const variantDto of variants) {
            const { id: variantId, quantity } = variantDto;

            // check availability
            await this.productVariantsService.rollbackStock(
              variantId,
              productId,
              quantity,
              queryRunner.manager,
            );
          }
        }
      }

      // Save updated paymet
      await queryRunner.manager.save(Payment, payment);

      await queryRunner.commitTransaction();

      // send a mail to the user
      try {
        console.log(user.firstName);
        await this.mailService.sendProductPurchaseMail(user, products);
      } catch (err) {
        throw new ConflictException(err);
      }

      return response.data;
    } catch (error) {
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

  /**
   * function called by paystack server after user pays
   * @param body
   * @param signature
   * @param req
   * @returns reference for payment
   */
  public async paymentWebhook(body: any, signature: string, req: any) {
    // regenerate the signature
    const hash = crypto
      .createHmac('sha512', this.paystackConfiguration.secret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (hash !== signature) {
      throw new HttpException('Invalid signature', HttpStatus.FORBIDDEN);
    }

    const { data, event } = body;

    if (event !== 'charge.success') {
      throw new HttpException('Invalid event type', HttpStatus.BAD_REQUEST);
    }

    // verify payment
    const paymentData = await this.verifyPayment(data.reference);

    // console.log('Payment successful:', paymentData);

    if (paymentData.data.status === 'success') {
      return { message: 'Payment verified and processed successfully' };
    } else {
      throw new HttpException(
        'Payment verification failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
