import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'XXXX@XXX.XXX', description: 'User`s email' })
  readonly email: string;

  @ApiProperty({ example: 'XXXXXXXXX', description: 'User`s password' })
  readonly password: string;
}
