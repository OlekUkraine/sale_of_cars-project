import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCarDto {
  @ApiProperty({ description: 'Car seller id' })
  @IsString({ message: 'most be number' })
  readonly userId: number;

  @ApiProperty({ description: 'Car brand' })
  @IsString({ message: 'most be string' })
  readonly brand: string;

  @ApiProperty({ description: 'Car model' })
  @IsString({ message: 'most be string' })
  readonly model: string;

  @ApiProperty({ description: 'What year of production is the car' })
  @IsNumber({}, { message: 'most be number' })
  readonly age: number;

  @ApiProperty({ description: 'Photo of the car' })
  @IsString({ message: 'most be string' })
  readonly image: string;

  @ApiProperty({ description: 'Description of the car' })
  @IsString({ message: 'most be string' })
  readonly description: string;

  @ApiProperty({ description: 'The price of the car' })
  @IsString({ message: 'most be number' })
  readonly price: number;
}
