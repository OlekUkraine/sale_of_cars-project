import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './roles.model';
import { Roles } from '../auth/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({ summary: 'Create roles' })
  @ApiResponse({ status: 200, type: Role })
  @Roles('admin', 'manager')
  @UseGuards(RolesGuard)
  @Post('/create')
  async create(@Body() dto: CreateRoleDto) {
    console.log(dto);
    return this.roleService.createRole(dto);
  }

  @ApiOperation({ summary: 'Get role by value' })
  @ApiResponse({ status: 200, type: Role })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get('/get/:value')
  async getByValue(@Param('value') value: string) {
    console.log('value>>>', value);
    return this.roleService.getRoleByValue(value);
  }

  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: 200, type: [Role] })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get()
  async getAll(): Promise<Role[]> {
    return this.roleService.getAllRoles();
  }
}
