import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { CarsModule } from './cars/cars.module';
import { CurrencyModule } from './currency/currency.module';
import { PaginationModule } from './pagination/pagination.module';
import { SequelizeConfiguration } from './configs/database/sequelize-configuration';

@Module({
  controllers: [],
  providers: [],
  imports: [
    SequelizeModule.forRootAsync(SequelizeConfiguration.config),
    UsersModule,
    RolesModule,
    AuthModule,
    CarsModule,
    CurrencyModule,
    PaginationModule,
  ],
})
export class AppModule {}
