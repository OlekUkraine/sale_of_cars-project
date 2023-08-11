import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { IUserCreation } from './interfaces/user.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/roles.model';
import { UserRole } from '../roles/user-roles.model';
import { Post } from '../posts/posts.model';

@Table({ tableName: 'users' })
export class User extends Model<User, IUserCreation> {
  @ApiProperty({ description: 'User`s id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ description: 'User`s email' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ description: 'User`s password' })
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

  @HasMany(() => Post)
  posts: Post[];
}
