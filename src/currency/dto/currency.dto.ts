import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CurrencyDto {
  @ApiProperty({ description: 'Currency ue' })
  @IsString({ message: 'most be string' })
  ccy: string;

  @ApiProperty({ description: 'Base currency' })
  @IsString({ message: 'most be string' })
  base_ccy: string;

  @ApiProperty({ description: 'Purchase price' })
  @IsString({ message: 'most be string' })
  buy: string;

  @ApiProperty({ description: 'Selling price' })
  @IsString({ message: 'most be string' })
  sale: string;
}
