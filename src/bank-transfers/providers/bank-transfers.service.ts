import { Injectable } from '@nestjs/common';
import { SaveBankTransferProvider } from './save-bank-transfer.provider';
import { CreateBankTransferDto } from '../dtos/create-brank-transfer.dto';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Injectable()
export class BankTransfersService {
  constructor(
    /**
     * injecting the save bank transfer provider
     */
    private readonly saveBankTransferProvider: SaveBankTransferProvider,
  ) {}

  public async saveBankTransfer(
    createBankTransferDto: CreateBankTransferDto,
    user: ActiveUserData,
    file: Express.Multer.File,
  ) {
    return await this.saveBankTransferProvider.saveBankTransfer(
      createBankTransferDto,
      user,
      file,
    );
  }
}
