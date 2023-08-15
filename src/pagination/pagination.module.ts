import { forwardRef, Module } from '@nestjs/common';
import { PaginationService } from './pagination.service';
import { CarsModule } from '../cars/cars.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [forwardRef(() => CarsModule), forwardRef(() => UsersModule)],
  providers: [PaginationService],
  exports: [PaginationService],
})
export class PaginationModule {}
