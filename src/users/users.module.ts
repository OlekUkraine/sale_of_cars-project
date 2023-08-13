import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Role } from '../roles/roles.model';
import { UserRole } from '../roles/user-roles.model';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { MPost } from '../posts/posts.model';
import { Car } from '../cars/cars.model';
import { CarsModule } from '../cars/cars.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => CarsModule),
    SequelizeModule.forFeature([User, Role, UserRole, MPost, Car]),
    forwardRef(() => RolesModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
