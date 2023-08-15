import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { IsEnum } from 'class-validator';
import { ECurrency } from '../enums/currency.enum';
import { TransferredAmountDto } from './dto/transferred.amount.dto';

@Controller('currency')
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {}

  @ApiOperation({ summary: 'Currency' })
  @ApiResponse({ status: 200 })
  @Roles('admin', 'manager', 'seller', 'user')
  @UseGuards(RolesGuard)
  @IsEnum(ECurrency)
  @Get(':baseCurrency')
  getExchangeRate(@Param('baseCurrency') baseCurrency: ECurrency) {
    return this.currencyService;
  }

  @Post('/amount')
  getTransferredAmount(@Body() dto: TransferredAmountDto) {
    return this.currencyService.transferredAmount(dto);
  }

  @Get('/update')
  createExchangeRate(): Promise<any> {
    return this.currencyService.getAndCreateExchangeRate();
  }
}
