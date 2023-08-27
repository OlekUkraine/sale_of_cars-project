import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRole } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import * as process from 'process';
import { FilesModule } from './files/files.module';
import { CarsModule } from './cars/cars.module';
import { Car } from './cars/cars.model';
import { CurrencyModule } from './currency/currency.module';
import { Currency } from './currency/currency.model';
import { PaginationModule } from './pagination/pagination.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `environments/.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRole, Car, Currency],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    FilesModule,
    CarsModule,
    CurrencyModule,
    PaginationModule,
  ],
})
export class AppModule {}
