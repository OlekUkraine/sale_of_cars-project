import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { ERoles } from '../enums/roles.enum';

export class CreateRoleDto {
  @ApiProperty({ description: 'User role on this resource' })
  @IsEnum(ERoles, {
    message: 'Invalid role. Available roles: admin, manager, seller, user',
  })
  @IsString({ message: 'most be string' })
  readonly value: ERoles;

  @ApiProperty({
    description: 'Description of the user`s role on this resource',
  })
  @IsString({ message: 'most be string' })
  readonly description: string;
}
