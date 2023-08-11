import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { User } from '../users/users.model';
import { Car } from './cars.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Car, User])],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
