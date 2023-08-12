import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { IPostCreation } from './interfaces/post.interface';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';

@Table({ tableName: 'posts' })
export class MPost extends Model<MPost, IPostCreation> {
  @ApiProperty({ description: 'Post`s id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ description: 'Title' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  title: string;

  @ApiProperty({ description: 'Content' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  content: string;

  @Column({ type: DataType.STRING })
  image: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  seller: User;
}
