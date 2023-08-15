import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ERoles } from '../../enums/roles.enum';

export class AddRoleDto {
  @IsString({ message: 'most be string' })
  @IsEnum(ERoles, {
    message: 'One of these options is allowed [ADMIN, MANAGER, SELLER, USER]',
  })
  readonly value: ERoles;

  @IsNumber()
  readonly userId: number;
}
