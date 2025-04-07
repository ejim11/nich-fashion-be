import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { SaveBankTransferProvider } from './save-bank-transfer.provider';
import { CreateBankTransferDto } from '../dtos/create-brank-transfer.dto';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { ConfirmBankTransferProvider } from './confirm-bank-transfer.provider';
import { BankTransfer } from '../bank-transfer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BankTransfersService {
  constructor(
    /**
     * injecting the save bank transfer provider
     */
    private readonly saveBankTransferProvider: SaveBankTransferProvider,

    /**
     * injecting the confirm bank transfer provider
     */
    private readonly confirmBankTransferProvider: ConfirmBankTransferProvider,

    /**
     * injecting the bank transfer repository
     */
    @InjectRepository(BankTransfer)
    private readonly bankTransferRepository: Repository<BankTransfer>,
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

  public async confirmBankTransfer(transferId: string) {
    return await this.confirmBankTransferProvider.confirmBankTransfer(
      transferId,
    );
  }

  public async findBankTransferById(transferId: string): Promise<BankTransfer> {
    let transfer: BankTransfer;

    try {
      transfer = await this.bankTransferRepository.findOne({
        where: { id: transferId },
      });
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    if (!transfer) {
      throw new BadRequestException('The bank transfer does not exist');
    }

    return transfer;
  }
}
