import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ERoles } from '../enums/roles.enum';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { PaginationService } from '../pagination/pagination.service';
import { PaginatedDto } from '../common/pagination/response';
import { PublicQueryDto } from '../common/query/query.dto';
import { PublicUserDto } from './dto/public.user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private readonly roleService: RolesService,
    private readonly paginationService: PaginationService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(dto);
    const existAnyRoles = await this.roleService.getAllRoles();

    if (!existAnyRoles.length) {
      const role = await this.roleService.createRole({
        value: ERoles.ADMIN,
        description: 'Administrator',
      });
      await user.$set('roles', [role.id]);

      return user;
    }

    if (existAnyRoles.length) {
      try {
        const role = await this.roleService.getRoleByValue(ERoles.USER);
        if (role) {
          await user.$set('roles', [role.id]);

          return user;
        } else {
          const role = await this.roleService.createRole({
            value: ERoles.USER,
            description: 'User',
          });
          await user.$set('roles', [role.id]);

          return user;
        }
      } catch (e) {
        throw new HttpException('Role is not exist', HttpStatus.BAD_REQUEST);
      }
    }
    return user;
  }

  async findAllUsersWithFilters(
    query: PublicQueryDto,
  ): Promise<PaginatedDto<PublicUserDto>> {
    const options = {
      page: query.page || '1',
      limit: query.limit || '5',
      sortField: query.sort || 'id',
      sortOrder: query.order || 'ASC',
    };
    const where = {};

    if (query.search) {
      where['brand'] = { [Op.in]: query.search.split(',') };
    }

    try {
      const foundUsers = await this.userRepository.findAll({
        where,
        order: [[options.sortField, options.sortOrder]],
      });

      return await this.paginationService.paginate(foundUsers, options);
    } catch (e) {
      throw new HttpException('your query is bad', HttpStatus.BAD_REQUEST);
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async getById(id: number) {
    return await this.userRepository.findByPk(id);
  }

  async addRole(dto: AddRoleDto): Promise<AddRoleDto> {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);

    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }

    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
  }

  async ban(dto: BanUserDto): Promise<User> {
    const user = await this.userRepository.findByPk(dto.userId);

    if (!user) {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    }

    if (dto.toBan && user.banned) {
      throw new HttpException('The user already has ban', HttpStatus.CONFLICT);
    }

    user.banReason = dto.toBan ? dto.banReason : '';
    user.banned = dto.toBan;
    await user.save();

    return user;
  }

  async delete(userId: number) {
    const userToDelete = await this.userRepository.findByPk(userId);

    return userToDelete.destroy();
  }
}
