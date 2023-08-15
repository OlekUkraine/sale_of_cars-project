import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class BanUserDto {
  @ApiProperty()
  @IsNumber()
  readonly userId: number;

  @ApiProperty()
  @IsString()
  readonly banReason: string;

  @ApiProperty()
  @IsBoolean()
  readonly toBan: boolean;
}
