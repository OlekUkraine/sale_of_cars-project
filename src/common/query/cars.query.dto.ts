import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class PublicCarDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsEnum(['year', 'price', 'id'])
  sort: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  order: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  search: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  page: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  limit: string;
}
