import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCarDto {
  @IsString({ message: 'most be number' })
  userId: number;

  @ApiProperty({ description: 'Car brand' })
  @IsString({ message: 'most be string' })
  readonly brand: string;

  @ApiProperty({ description: 'Car model' })
  @IsString({ message: 'most be string' })
  readonly model: string;

  @ApiProperty({ description: 'What year of production is the car' })
  @IsNumber({}, { message: 'most be number' })
  readonly year: number;

  @ApiProperty({ description: 'Photo of the car' })
  @IsString({ message: 'most be string' })
  readonly image: string;

  @ApiProperty({ description: 'Description of the car' })
  @IsString({ message: 'most be string' })
  readonly description: string;

  @ApiProperty({ description: 'The price of the car' })
  @IsString({ message: 'most be number' })
  price: string;

  @ApiProperty({ description: 'Currency most be UAH, USD or EUR' })
  @IsString({ message: 'most be string' })
  currency: string;
}
