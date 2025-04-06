import { Module } from '@nestjs/common';
import { BankTransfersController } from './bank-transfers.controller';
import { BankTransfersService } from './providers/bank-transfers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankTransfer } from './bank-transfer.entity';
import { SaveBankTransferProvider } from './providers/save-bank-transfer.provider';
import { ProductVariantsModule } from 'src/product-variants/product-variants.module';
import { UploadsModule } from 'src/uploads/uploads.module';

@Module({
  imports: [
    ProductVariantsModule,
    UploadsModule,
    TypeOrmModule.forFeature([BankTransfer]),
  ],
  controllers: [BankTransfersController],
  providers: [BankTransfersService, SaveBankTransferProvider],
})
export class BankTransfersModule {}
