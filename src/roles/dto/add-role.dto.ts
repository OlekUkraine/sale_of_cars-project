import { IsEnum, IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @IsString()
  @IsEnum(['ADMIN', 'MANAGER', 'SELLER', 'USER'])
  readonly value: string;

  @IsNumber()
  readonly userId: number;
}
