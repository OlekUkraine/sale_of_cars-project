import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class PublicUserDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  premium: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  banned: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  banReason: string;
}
