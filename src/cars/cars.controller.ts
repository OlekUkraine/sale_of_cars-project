import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create.car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post('/create')
  createCar(@Body() dto: CreateCarDto) {
    return this.carsService.create(dto);
  }

  @Patch()
  updateCar(@Body() dto: CreateCarDto) {
    return this.carsService.update(dto);
  }

  @Delete('/delete/:carId')
  deleteCar(@Param('carId') carId: number) {
    return this.carsService.delete(carId);
  }
}
