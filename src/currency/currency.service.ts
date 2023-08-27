import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { API_PB } from '../configs/urls';
import { firstValueFrom } from 'rxjs';
import { ECurrency } from '../enums/currency.enum';
import { InjectModel } from '@nestjs/sequelize';
import { Currency } from './currency.model';
import { CurrencyDto } from './dto/currency.dto';
import { TransferredAmountDto } from './dto/transferred.amount.dto';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectModel(Currency) private currencyRepository: typeof Currency,
    private httpService: HttpService,
  ) {}

  async transferredAmount(dto: TransferredAmountDto): Promise<string> {
    const currentExchangeRate = await this.getAndCreateExchangeRate();
    const filteredCurrency = currentExchangeRate.filter(
      (value: CurrencyDto) => value.ccy === dto.currency,
    )[0];

    if (dto.currency !== ECurrency.UAH) {
      return (+dto.price * filteredCurrency.buy).toString();
    }

    return dto.price;
  }

  async getCurrencySale(currency: string): Promise<string> {
    const currentExchangeRate = await this.currencyRepository.findOne({
      where: { ccy: currency },
    });

    return currentExchangeRate.sale;
  }

  async getAndCreateExchangeRate(): Promise<any> {
    const { data } = await this.getExchangeRate();

    if (data) {
      await Currency.destroy({
        where: {},
      }).then((rowsDeleted) => {
        console.log(`Deleted ${rowsDeleted} rows.`);
      });

      await Promise.all([
        data.map(
          async (value: CurrencyDto): Promise<Currency> =>
            await this.currencyRepository.create({ ...value }),
        ),
      ]);

      console.log('currency >>>>>>>>>>>>>>>>>>>>>>..', data);

      return data;
    }
  }

  private async getExchangeRate(): Promise<any> {
    return await firstValueFrom(this.httpService.get(API_PB));
  }
}
