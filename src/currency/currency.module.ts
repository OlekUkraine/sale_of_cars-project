import { forwardRef, Module } from '@nestjs/common';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Currency } from './currency.model';
import { CarsModule } from '../cars/cars.module';

@Module({
  imports: [
    forwardRef(() => CarsModule),
    forwardRef(() => AuthModule),
    JwtModule,
    SequelizeModule.forFeature([Currency]),
    HttpModule,
  ],
  controllers: [CurrencyController],
  providers: [CurrencyService],
  exports: [CurrencyService],
})
export class CurrencyModule {}
