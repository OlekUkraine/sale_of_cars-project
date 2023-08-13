import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create.car.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Car } from './cars.model';
import { User } from '../users/users.model';
import { PublicCarDto } from '../common/query/cars.query.dto';

@ApiTags('cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @ApiOperation({ summary: 'Create new car' })
  @ApiResponse({ status: 200, type: Car })
  @Roles('seller', 'admin')
  @UseGuards(RolesGuard)
  @Post('/create')
  async createCar(@Body() dto: CreateCarDto, @Req() req: { user: User }) {
    dto.userId = req.user.id;
    return this.carsService.create(dto);
  }

  @Get()
  async getCarsList(@Query() query: PublicCarDto) {
    return this.carsService.findAllCarsWithFilters(query);
  }

  @ApiOperation({ summary: 'Update car' })
  @ApiResponse({ status: 200, type: Car })
  @Roles('seller', 'admin')
  @UseGuards(RolesGuard)
  @Patch()
  async updateCar(@Body() dto: CreateCarDto) {
    return this.carsService.update(dto);
  }

  @ApiOperation({ summary: 'Delete car by id' })
  @ApiResponse({ status: 200 })
  @Roles('seller', 'admin', 'manager')
  @UseGuards(RolesGuard)
  @Delete('/delete/:carId')
  async deleteCar(@Param('carId') carId: number) {
    return this.carsService.delete(carId);
  }
}
