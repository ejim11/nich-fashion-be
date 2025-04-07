import {
  BadRequestException,
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BankTransfer } from '../bank-transfer.entity';
import { Payment } from 'src/payments/payment.entity';
import { paymentStatus } from 'src/payments/enums/paymentStatus.enum';

@Injectable()
export class ConfirmBankTransferProvider {
  constructor(
    /**
     * Injecting datasource
     */
    private readonly dataSource: DataSource,
  ) {}

  public async confirmBankTransfer(transferId: string) {
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

    try {
      // find the bank transfer by id
      const transfer = await queryRunner.manager.findOne(BankTransfer, {
        where: { id: transferId },
      });

      console.log(transfer);

      if (!transfer) {
        throw new BadRequestException('The user does not exist');
      }
      // then find the payment
      const payment = await queryRunner.manager.findOne(Payment, {
        where: { id: transfer.payment.id },
      });

      // confirm bank transfer

      transfer.isConfirmed = true;

      payment.status = paymentStatus.SUCCESS;

      await queryRunner.manager.save(transfer);

      await queryRunner.manager.save(payment);

      // if successful commit
      // ensures the txn is committed to the db

      await queryRunner.commitTransaction();

      return {
        message: 'Confirmed successfully',
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
