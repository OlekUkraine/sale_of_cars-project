import { Body, Controller, Get, Post } from '@nestjs/common';
import { CurrencyService } from './currency.service';

import { TransferredAmountDto } from './dto/transferred.amount.dto';

@Controller('currency')
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {}

  @Post('/amount')
  getTransferredAmount(@Body() dto: TransferredAmountDto) {
    return this.currencyService.transferredAmount(dto);
  }

  @Get('/update')
  createExchangeRate(): Promise<any> {
    return this.currencyService.getAndCreateExchangeRate();
  }
}
