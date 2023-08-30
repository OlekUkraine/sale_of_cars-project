// import { Injectable } from '@nestjs/common';
// import * as dotenv from 'dotenv';
//
// @Injectable()
// export class ConfigService {
//   private readonly environment: string;
//
//   constructor() {
//     this.environment = process.env.NODE_ENV ?? '';
//     dotenv.config({ path: `../environments/${'.' + this.environment}.env` });
//   }
//
//   port() {
//     return +process.env.PORT || 5000;
//   }
//   postgresHost() {
//     return process.env.POSTGRES_HOST;
//   }
//   postgresPort() {
//     return +process.env.POSTGRES_PORT;
//   }
//   postgresUser() {
//     return process.env.POSTGRES_USER;
//   }
//   postgresPassword() {
//     return process.env.POSTGRES_PASSWORD;
//   }
//   postgresDb() {
//     return process.env.POSTGRES_DB;
//   }
//   privateKey() {
//     return process.env.PRIVATE_KEY;
//   }
//   lifeTimeOfToken() {
//     return process.env.LIFETIME_OF_TOKEN;
//   }
//   secretSalt() {
//     return +process.env.SECRET_SALT;
//   }
//   apiPb() {
//     return process.env.API_PB;
//   }
// }

import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import configuration from './configuration';

@Injectable()
export class PostgresqlConfigService {
  constructor(
    @Inject(configuration.KEY)
    private postgresqlConfiguration: ConfigType<typeof configuration>,
  ) {}

  get host(): string {
    return this.postgresqlConfiguration.host;
  }

  get port(): number {
    return Number(this.postgresqlConfiguration.port);
  }

  get user(): string {
    return this.postgresqlConfiguration.user;
  }

  get password(): string {
    return this.postgresqlConfiguration.password;
  }

  get database(): string {
    return this.postgresqlConfiguration.database;
  }
}
