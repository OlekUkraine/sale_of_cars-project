import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create.car.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Car } from './cars.model';

@ApiTags('cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @ApiOperation({ summary: 'Create new car' })
  @ApiResponse({ status: 200, type: Car })
  @Roles('SELLER')
  @UseGuards(RolesGuard)
  @Post('/create')
  createCar(@Body() dto: CreateCarDto) {
    return this.carsService.create(dto);
  }

  @ApiOperation({ summary: 'Update car' })
  @ApiResponse({ status: 200, type: Car })
  @Roles('SELLER')
  @UseGuards(RolesGuard)
  @Patch()
  updateCar(@Body() dto: CreateCarDto) {
    return this.carsService.update(dto);
  }

  @ApiOperation({ summary: 'Delete car by id' })
  @ApiResponse({ status: 200 })
  @Roles('SELLER')
  @UseGuards(RolesGuard)
  @Delete('/delete/:carId')
  deleteCar(@Param('carId') carId: number) {
    return this.carsService.delete(carId);
  }
}
