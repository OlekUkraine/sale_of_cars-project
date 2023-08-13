import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { Roles } from '../auth/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
// import { ValidationPipe } from "../pipes/validation.pipe";

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 200, type: User })
  // @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('admin', 'manager')
  @UseGuards(RolesGuard)
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Distribution of roles' })
  @ApiResponse({ status: 200 })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/add_role')
  async addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @ApiOperation({ summary: 'Banned users' })
  @ApiResponse({ status: 200 })
  @Roles('admin', 'manager')
  @UseGuards(RolesGuard)
  @Post('/ban')
  async ban(@Body() dto: BanUserDto) {
    return this.userService.ban(dto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200 })
  @Roles('admin', 'MANAGER')
  @UseGuards(RolesGuard)
  @Delete('delete/:userId')
  async delete(@Param('userId') userId: number) {
    console.log(userId);
    return this.userService.delete(userId);
  }
}
