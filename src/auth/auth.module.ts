import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { BearerStrategy } from './bearer.strategy';
import { Role } from '../roles/roles.model';
import { UserRole } from '../roles/user-roles.model';

@Module({
  controllers: [AuthController],
  providers: [AuthService, BearerStrategy],
  imports: [
    PassportModule.register({
      defaultStrategy: 'bearer',
      property: 'user',
      session: false,
    }),
    RolesModule,
    forwardRef(() => UsersModule),
    SequelizeModule.forFeature([User, Role, UserRole]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.PRIVATE_KEY || 'SECRET',
        signOptions: {
          expiresIn: process.env.LIFETIME_OF_TOKEN || '24h',
        },
        verifyOptions: {
          clockTolerance: 60,
          maxAge: process.env.LIFETIME_OF_TOKEN || '24h',
        },
      }),
    }),
  ],
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {}
