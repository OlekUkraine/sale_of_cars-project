import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { RoleCreationAttrs } from './interfaces/role.interface';
import { User } from '../users/users.model';
import { UserRole } from './user-roles.model';
import { ERoles } from './enums/roles.enum';
import { IsEnum } from 'class-validator';

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({ description: 'Role`s id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'One of these options is allowed [ADMIN, MANAGER, SELLER, USER]',
    description: 'User`s role',
  })
  @Column({
    type: DataType.ENUM,
    unique: true,
    allowNull: false,
    values: Object.values(ERoles),
  })
  @IsEnum(ERoles, {
    message: 'Invalid role. Available roles: ADMIN, MANAGER, SELLER, USER',
  })
  value: ERoles;

  @ApiProperty({ description: 'Description user`s role' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}
