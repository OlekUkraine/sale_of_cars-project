import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create.car.dto';
import { Car } from './cars.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'sequelize-typescript';
import { AuthService } from '../auth/auth.service';
import { CurrencyService } from '../currency/currency.service';
import { ECurrency } from '../enums/currency.enum';
import { Op } from 'sequelize';
import { PaginatedDto } from '../common/pagination/response';
import { ICarPublicInfo } from './interfaces/car.interface';
import { PaginationService } from '../pagination/pagination.service';
import { CarsPublicQueryDto } from './dto/cars.public.dto';
import { FindCarDto } from './dto/find.car.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    private readonly authService: AuthService,
    private readonly currencyService: CurrencyService,
    private readonly paginationService: PaginationService,
    private readonly usersService: UsersService,
  ) {}

  async addCarForSale(dto: CreateCarDto, req: any): Promise<Car> {
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

  async findAllCarsWithFilters(
    query: CarsPublicQueryDto,
  ): Promise<PaginatedDto<Car>> {
    const options = {
      page: query.page || '1',
      limit: query.limit || '5',
      sortField: query.sort || 'id',
      sortOrder: query.order || 'ASC',
    };
    const where = {};
    const currency = (query.whatCurrency || ECurrency.USD).toUpperCase();

    if (query.search) {
      where['brand'] = { [Op.in]: query.search.split(',') };
    }

    try {
      const foundCars = await this.carRepository.findAll({
        where,
        order: [[options.sortField, options.sortOrder]],
      });

      const carsList = await this.paginationService.paginate(
        foundCars,
        options,
      );

      if ('UAH' !== currency) {
        const ue = await this.currencyService.getCurrencySale(currency);

        carsList.entities.map((value) => {
          value.price = String(+value.price / +ue);
          value.currency = currency;
        });
      }

      return carsList;
    } catch (e) {
      throw new HttpException('your query is bad', HttpStatus.BAD_REQUEST);
    }
  }

  async update(dto: ICarPublicInfo) {
    const carForUpdate = await this.getOne(dto.id);
    await carForUpdate.update({ ...dto });
    return carForUpdate;
  }

  async delete(carId: number) {
    const carToDelete = await this.getOne(carId);
    return carToDelete.destroy();
  }

  async allInformationAboutCar(carId: number): Promise<FindCarDto> {
    try {
      const carsInfo = await this.getOne(carId);
      const userContacts = await this.usersService.getById(carsInfo.userId);

      return {
        ...carsInfo.dataValues,
        sellerPhone: userContacts.phoneNumber,
        sellerEmail: userContacts.email,
      };
    } catch (e) {
      throw new HttpException('Not found car', HttpStatus.NOT_FOUND);
    }
  }

  async getOne(carId: number) {
    return await this.carRepository.findByPk(carId);
  }

  private async create(dto: CreateCarDto): Promise<Car> {
    return await this.carRepository.create(dto);
  }
}
