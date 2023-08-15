import { forwardRef, Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { User } from '../users/users.model';
import { Car } from './cars.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from '../files/files.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { CurrencyModule } from '../currency/currency.module';
import { JwtModule } from '@nestjs/jwt';
import { PaginationModule } from '../pagination/pagination.module';

@Module({
  imports: [
    forwardRef(() => CurrencyModule),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
    forwardRef(() => PaginationModule),
    SequelizeModule.forFeature([Car, User]),
    FilesModule,
    JwtModule,
  ],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService],
})
export class CarsModule {}
