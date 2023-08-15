import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ERoles } from '../../enums/roles.enum';
import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {
  @ApiProperty({
    enum: ERoles,
    description: 'Role value (admin, manager, seller, user)',
  })
  @IsString({ message: 'most be string' })
  @IsEnum(ERoles, {
    message: 'One of these options is allowed [admin, manager, seller, user]',
  })
  value: ERoles;

  @ApiProperty()
  @IsNumber()
  readonly userId: number;
}
