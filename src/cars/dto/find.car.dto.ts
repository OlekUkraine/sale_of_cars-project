import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateCarDto } from './create.car.dto';

export class FindCarDto extends CreateCarDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly sellerEmail: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly sellerPhone: string;
}
