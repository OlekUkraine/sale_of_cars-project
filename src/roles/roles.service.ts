import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { ERoles } from './enums/roles.enum';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}
  async createRole(dto: CreateRoleDto) {
    return await this.roleRepository.create(dto);
  }

  async getRoleByValue(value: ERoles) {
    return await this.roleRepository.findOne({ where: { value } });
  }

  async getAllRoles() {
    return await this.roleRepository.findAll();
  }
}
