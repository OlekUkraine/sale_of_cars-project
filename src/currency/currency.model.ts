import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { ICurrency } from './interfaces/currency.interface';

@Table({ tableName: 'currency' })
export class Currency extends Model<Currency, ICurrency> {
  @ApiProperty({ description: 'Currency id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ description: 'Currency ue' })
  @Column({
    type: DataType.STRING,
  })
  ccy: string;

  @ApiProperty({ description: 'Base currency' })
  @Column({
    type: DataType.STRING,
  })
  base_ccy: string;

  @ApiProperty({ description: 'Purchase price' })
  @Column({
    type: DataType.STRING,
  })
  buy: string;

  @ApiProperty({ description: 'Selling price' })
  @Column({
    type: DataType.STRING,
  })
  sale: string;
}
