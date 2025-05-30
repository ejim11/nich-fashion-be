import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/enums/role-type.enum';
import { CreateBankTransferDto } from './dtos/create-brank-transfer.dto';
import { ActiveUser } from 'src/auth/decorator/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { BankTransfersService } from './providers/bank-transfers.service';

@Controller('bank-transfers')
export class BankTransfersController {
  constructor(
    /**
     * injecting the bank transfer sevice
     */
    private readonly bankTransfersService: BankTransfersService,
  ) {}

  /**
   * @function Submits bank tf and products bought details
   * @param createBankTransferDto
   * @param user
   * @param file
   * @returns bank transfer details
   */
  @UseInterceptors(FileInterceptor('file'))
  @Roles(Role.USER)
  @Post('submit-tf-info')
  public saveBankTransferDetails(
    @Body() createBankTransferDto: CreateBankTransferDto,
    @ActiveUser() user: ActiveUserData,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.bankTransfersService.saveBankTransfer(
      createBankTransferDto,
      user,
      file,
    );
  }

  // confirm bank tf: only admin
  @Patch('/:transferId/confirm-transfer')
  @Roles(Role.ADMIN)
  public confirmBankTransfer(@Param('transferId') transferId: string) {
    return this, this.bankTransfersService.confirmBankTransfer(transferId);
  }
}
