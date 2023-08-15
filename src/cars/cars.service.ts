import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create.car.dto';
import { Car } from './cars.model';
import { PublicCarDto } from '../common/query/cars.query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'sequelize-typescript';
import { AuthService } from '../auth/auth.service';
import { CurrencyService } from '../currency/currency.service';
import { ECurrency } from '../enums/currency.enum';
import { User } from '../users/users.model';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    private readonly authService: AuthService,
    private readonly currencyService: CurrencyService,
  ) {}

  async addSaleCar(dto: CreateCarDto, req: any): Promise<Car> {
    const newPrice = await this.currencyService.transferredAmount({
      price: dto.price,
      currency: dto.currency,
    });

    return await this.create({
      ...dto,
      price: newPrice,
      currency: ECurrency.UAH,
      userId: req.user.id,
    });
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

  private async create(dto: CreateCarDto): Promise<Car> {
    return await this.carRepository.create(dto);
  }
}
