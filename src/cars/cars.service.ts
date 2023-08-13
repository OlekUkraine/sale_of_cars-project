import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create.car.dto';
import { Car } from './cars.model';
import { PublicCarDto } from '../common/query/cars.query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'sequelize-typescript';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    private readonly authService: AuthService,
  ) {}

  async create(dto: CreateCarDto): Promise<Car> {
    return await this.carRepository.create(dto);
  }

  async findAllCarsWithFilters(query: PublicCarDto) {
    console.log(query);

    return {
      // page: pagination.meta.currentPage,
      // pages: pagination.meta.totalPages,
      // countItem: pagination.meta.totalItems,
      // entities: rawResults as CreateCarDto[],
    };
  }

  async getOne() {
    return null;
  }

  async update(dto: CreateCarDto) {
    return await this.carRepository.findOne();
  }

  async delete(carId: number) {
    const carToDelete = await this.carRepository.findByPk(carId);
    return carToDelete.destroy();
  }
}
