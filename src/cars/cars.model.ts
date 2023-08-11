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
import { ICarCreation } from './interfaces/car.interface';

@Table({ tableName: 'cars' })
export class Car extends Model<Car, ICarCreation> {
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
  age: number;

  @ApiProperty({ description: 'Image of the car' })
  @Column({ type: DataType.STRING })
  image: string;

  @ApiProperty({ description: 'Information about the car' })
  @Column({ type: DataType.STRING })
  description: string;

  @ApiProperty({ description: 'Image of the car' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  seller: User;
}
