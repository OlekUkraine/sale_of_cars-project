import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from '../roles/dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ERoles } from '../roles/enums/roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
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

  async getAllUsers() {
    return await this.userRepository.findAll({ include: { all: true } });
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async getById(id: number) {
    return await this.userRepository.findByPk(id);
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);

    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }

    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);

    if (!user) {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    }

    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }

  async delete(userId: number) {
    const userToDelete = await this.userRepository.findByPk(userId);

    return userToDelete.destroy();
  }
}
