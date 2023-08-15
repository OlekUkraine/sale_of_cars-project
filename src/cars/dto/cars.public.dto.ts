import { PublicQueryDto } from '../../common/query/query.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CarsPublicQueryDto extends PublicQueryDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  whatCurrency: string;
}
