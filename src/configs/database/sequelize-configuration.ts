import { SequelizeModuleAsyncOptions } from '@nestjs/sequelize';
import { PostgresqlConfigModule } from './config.module';
import { PostgresqlConfigService } from './configuration.service';
import { User } from '../../users/users.model';
import { Role } from '../../roles/roles.model';
import { UserRole } from '../../roles/user-roles.model';
import { Car } from '../../cars/cars.model';
import { Currency } from '../../currency/currency.model';

export class SequelizeConfiguration {
  static get config(): SequelizeModuleAsyncOptions {
    return {
      imports: [PostgresqlConfigModule],
      useFactory: (configService: PostgresqlConfigService) => ({
        dialect: 'postgres',
        host: configService.host,
        port: configService.port,
        username: configService.user,
        password: configService.password,
        database: configService.database,
        models: [User, Role, UserRole, Car, Currency],
        autoLoadModels: true,
        synchronize: true,
        // entities: [`${process.cwd()}/**/*.entity{.js, .ts}`],
        // migrationsTableName: 'migrations',
      }),
      inject: [PostgresqlConfigService],
    };
  }
}
