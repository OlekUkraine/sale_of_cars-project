import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create.car.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Car } from './cars.model';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car) private carRepository: typeof Car) {}
  async create(dto: CreateCarDto) {
    return await this.carRepository.create(dto);
  }

  async update(dto: CreateCarDto) {
    return await this.carRepository.findOne();
  }

  async delete(carId: number) {
    const carToDelete = await this.carRepository.findByPk(carId);
    return carToDelete.destroy();
  }
}
