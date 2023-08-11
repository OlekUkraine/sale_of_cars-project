import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'User`s email' })
  @IsString({ message: 'most be string' })
  @IsEmail({}, { message: 'The email is incorrect' })
  readonly email: string;

  @ApiProperty({ description: 'User`s password' })
  @IsString({ message: 'most be string' })
  @Length(3, 20, { message: 'Min 3 characters max 20' })
  readonly password: string;
}
