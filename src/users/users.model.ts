import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { IUserInformation } from './interfaces/user.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/roles.model';
import { UserRole } from '../roles/user-roles.model';

@Table({ tableName: 'users' })
export class User extends Model<User, IUserInformation> {
  @ApiProperty({ description: 'The user`s id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ description: 'The user`s email' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ description: 'The user`s phone number' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  phoneNumber: string;

  @ApiProperty({ description: 'The user`s password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ description: 'Whether the user has a premium subscription' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  premium: boolean;

  @ApiProperty({ description: 'User banned or not' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  banned: boolean;

  @ApiProperty({ description: 'If the user was banned for what else' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  banReason: string;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];
}
