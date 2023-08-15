import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { ICarPublicInfo } from './interfaces/car.interface';
import { IsString } from 'class-validator';

@Table({ tableName: 'cars' })
export class Car extends Model<Car, ICarPublicInfo> {
  @ApiProperty({ description: 'Car`s id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ description: 'Brand of the car' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  brand: string;

  @ApiProperty({ description: 'Model of the car' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  model: string;

  @ApiProperty({ description: 'Age of the car' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  year: number;

  @ApiProperty({ description: 'Image of the car' })
  @Column({ type: DataType.STRING })
  image: string;

  @ApiProperty({ description: 'Information about the car' })
  @Column({ type: DataType.STRING })
  description: string;

  @ApiProperty({ description: 'Image of the car' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  price: string;

  // @ApiProperty({ description: 'Currency most be UAH, USD or EUR' })
  @Column({ type: DataType.STRING })
  currency: string;

  @ApiProperty({ description: 'ID of the car owner' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  seller: User;
}
