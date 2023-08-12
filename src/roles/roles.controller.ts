import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './roles.model';
import { ERoles } from './enums/roles.enum';
import { Roles } from '../auth/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({ summary: 'Create roles' })
  @ApiResponse({ status: 200, type: Role })
  @Roles(ERoles.ADMIN, ERoles.MANAGER)
  @UseGuards(RolesGuard)
  @Post('/create')
  create(@Body() dto: CreateRoleDto) {
    console.log(dto);
    return this.roleService.createRole(dto);
  }

  @ApiOperation({ summary: 'Get role by value' })
  @ApiResponse({ status: 200, type: Role })
  // @Roles(ERoles.ADMIN)
  @UseGuards(RolesGuard)
  @Get('/get')
  getByValue(@Body() value: ERoles) {
    return this.roleService.getRoleByValue(value);
  }
}
