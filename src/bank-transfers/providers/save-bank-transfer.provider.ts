import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateBankTransferDto } from '../dtos/create-brank-transfer.dto';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { DataSource } from 'typeorm';
import { Discount } from 'src/discounts/discounts.entity';
import { User } from 'src/users/user.entity';
import { ProductVariantsService } from 'src/product-variants/providers/product-variants.service';
import { UploadsService } from 'src/uploads/providers/uploads.service';
import { PaymentMethod } from 'src/payment/enums/payment-method.enum';
import { paymentStatus } from 'src/payment/enums/paymentStatus.enum';
import { Payment } from 'src/payment/payment.entity';
import { Order } from 'src/orders/order.entity';
import { PaymentVariant } from 'src/payment/payment-variant.entity';
import { ProductVariant } from 'src/product-variants/product-variants.entity';
import { DiscountUsage } from 'src/discounts-usage/discounts-usage.entity';
import { BankTransfer } from '../bank-transfer.entity';

@Injectable()
export class SaveBankTransferProvider {
  constructor(
    /**
     * Injecting datasource
     */
    private readonly dataSource: DataSource,

    /**
     * injecting the product variants service
     */
    private readonly productVariantsService: ProductVariantsService,

    /**
     * injecting the uploads service
     */
    private readonly uploadsService: UploadsService,
  ) {}

  public async saveBankTransfer(
    createBankTransferDto: CreateBankTransferDto,
    user: ActiveUserData,
    file: Express.Multer.File,
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
    const buyer: User = await queryRunner.manager.findOne(User, {
      where: { id: user.sub },
    });

    let discount: Discount;
    // find the discount if there is one
    if (createBankTransferDto.discountId) {
      discount = await queryRunner.manager.findOne(Discount, {
        where: { id: createBankTransferDto.discountId },
      });
    }

    // user info should have details about address but if there is a set delivery address then use that
    const deliveryAddress =
      createBankTransferDto.deliveryAddress ??
      `${buyer.streetAddress}, ${buyer.city}, ${buyer.state}`;

    const deliveryPicker =
      createBankTransferDto.deliveryPicker ??
      `${buyer.firstName} ${buyer.lastName}`;

    // calculate the total amount
    let totalAmount = createBankTransferDto.products
      .map((prd) => {
        // loop through inner variants
        const totalQty = prd.variants
          .map((vr) => vr.quantity)
          .reduce((acc, cur) => cur + acc, 0);

        return prd.price * totalQty;
      })
      .reduce((acc, cur) => acc + cur, 0);

    totalAmount = createBankTransferDto.discountId
      ? totalAmount - (discount.percentOff / 100) * totalAmount
      : totalAmount;

    try {
      const fileDir = `bank-transfers/${buyer.firstName}-${buyer.id}`;
      const proofImgUrl = await this.uploadsService.uploadFile(file, fileDir);

      // Iterate through each product in the request
      for (const product of createBankTransferDto.products) {
        const { productId, variants } = product;

        // Iterate through each variant the user wants to buy
        for (const variantDto of variants) {
          const { id: variantId, quantity } = variantDto;

          // reduce quantity in db
          const variant = await queryRunner.manager
            .createQueryBuilder(ProductVariant, 'variant')
            .where('variant.id = :id AND variant.productId = :productId', {
              id: variantId,
              productId,
            })
            .getOne();

          // Reserve the stock by decrementing the quantity
          variant.quantity -= quantity;

          if (variant.quantity <= 0) {
            variant.soldOut = true;
          }

          // Save the updated variant (within the transaction)
          await queryRunner.manager.save(variant);
        }
      }

      // Create payment record
      const payment = await queryRunner.manager.save(Payment, {
        userId: buyer.id,
        amount: totalAmount,
        method: PaymentMethod.TRANSFER,
        status: paymentStatus.PENDING,
      });

      // create order
      const order = await queryRunner.manager.save(Order, {
        userId: buyer.id,
        deliveryAddress: deliveryAddress,
        totalAmount: totalAmount,
        deliveryPicker: deliveryPicker,
        payment: payment,
      });

      // get all product variants
      const prdVariants = await Promise.all(
        createBankTransferDto.products
          .map((prd) => prd.variants)
          .flat()
          .map(async (vr) => {
            const variant = await queryRunner.manager.findOne(ProductVariant, {
              where: { id: vr.id },
            });

            return {
              variant,
              quantity: vr.quantity,
            };
          }),
      );

      // create payment variants from the product variants
      for (const variant of prdVariants) {
        // create payment variant
        await queryRunner.manager.save(PaymentVariant, {
          paymentId: payment.id,
          variantId: variant.variant.id,
          quantity: variant.quantity,
        });
      }

      // if user used discount then add it to the discount usage
      if (discount.id) {
        // create the discount usage
        const discountUsage = await queryRunner.manager.save(DiscountUsage, {
          user: buyer,
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

      //   create bank transfer row

      const bankTransfer = await queryRunner.manager.save(BankTransfer, {
        userId: buyer.id,
        imageProof: proofImgUrl,
        amount: totalAmount,
        payment: payment,
      });

      // if successful commit
      // ensures the txn is committed to the db

      await queryRunner.commitTransaction();

      return {
        message: 'Proof submitted successfully',
        info: bankTransfer,
      };
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
