import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { ERoles } from './enums/roles.enum';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}
  async createRole(dto: CreateRoleDto): Promise<Role> {
    const isNotBadRole = Object.values(ERoles).includes(dto.value);
    console.log('isNotBadRole', isNotBadRole);
    console.log('typeof ERoles', ERoles);

    if (!isNotBadRole) {
      throw new HttpException(
        `A role with a value of ${dto.value} is not valid`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const isExistRole = await this.getRoleByValue(dto.value);

    if (isExistRole) {
      throw new HttpException(
        `Role with value ${dto.value} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.roleRepository.create(dto);
  }

  async getRoleByValue(value: string): Promise<Role> {
    console.log(value);
    return await this.roleRepository.findOne({ where: { value } });
  }

  async getAllRoles(): Promise<Role[]> {
    return await this.roleRepository.findAll();
  }
}
