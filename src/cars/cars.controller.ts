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
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Car } from './cars.model';
import {
  ApiPaginatedResponse,
  PaginatedDto,
} from '../common/pagination/response';
import { FindCarDto } from './dto/find.car.dto';
import { ICarPublicInfo } from './interfaces/car.interface';
import { CarsPublicQueryDto } from './dto/cars.public.dto';

@ApiTags('cars')
@ApiExtraModels(CreateCarDto, PaginatedDto)
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @ApiOperation({ summary: 'Create new car' })
  @ApiResponse({ status: 200, type: Car })
  @Roles('seller', 'admin')
  @UseGuards(RolesGuard)
  @Post('/create')
  async createCar(@Body() dto: CreateCarDto, @Req() req: any): Promise<Car> {
    return this.carsService.addCarForSale(dto, req);
  }

  @ApiOperation({ summary: 'Get all cars' })
  @ApiPaginatedResponse('entities', CreateCarDto)
  @Get('/list')
  async getCarsList(
    @Query() query: CarsPublicQueryDto,
  ): Promise<PaginatedDto<Car>> {
    return this.carsService.findAllCarsWithFilters(query);
  }

  @ApiOperation({ summary: 'Choose a car' })
  @ApiResponse({ status: 200, type: FindCarDto })
  @Get('/buy/:carId')
  async getCarInfo(@Param('carId') carId: number): Promise<FindCarDto> {
    return this.carsService.allInformationAboutCar(carId);
  }

  @ApiOperation({ summary: 'Update car' })
  @ApiResponse({ status: 200, type: Car })
  @Roles('seller', 'admin')
  @UseGuards(RolesGuard)
  @Patch('/update')
  async updateCar(@Body() dto: ICarPublicInfo): Promise<Car> {
    return this.carsService.update(dto);
  }

  @ApiOperation({ summary: 'Delete car by id' })
  @ApiResponse({ status: 200 })
  @Roles('seller', 'admin', 'manager')
  @UseGuards(RolesGuard)
  @Delete('/delete/:carId')
  async deleteCar(@Param('carId') carId: number): Promise<any> {
    return this.carsService.delete(carId);
  }
}
