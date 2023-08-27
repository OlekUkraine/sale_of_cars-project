import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './users.model';
import { Roles } from '../auth/decorators/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import {
  ApiPaginatedResponse,
  PaginatedDto,
} from '../common/pagination/response';
import { PublicQueryDto } from '../common/query/query.dto';
import { PublicUserDto } from './dto/public.user.dto';

@ApiTags('users')
@ApiExtraModels(PublicUserDto, PaginatedDto)
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
  @ApiPaginatedResponse('entities', PublicUserDto)
  @Roles('admin', 'manager')
  @UseGuards(RolesGuard)
  @Get('/list')
  async getAllUsers(
    @Query() query: PublicQueryDto,
  ): Promise<PaginatedDto<PublicUserDto>> {
    return this.userService.findAllUsersWithFilters(query);
  }

  @ApiOperation({ summary: 'Distribution of roles' })
  @ApiResponse({ status: 200, type: AddRoleDto })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/add_role')
  async addRole(@Body() dto: AddRoleDto): Promise<AddRoleDto> {
    console.log(dto);
    return this.userService.addRole(dto);
  }

  @ApiOperation({ summary: 'Buy premium' })
  @ApiResponse({ status: 200, type: AddRoleDto })
  @Post('/premium')
  async addPremiumStatus(@Req() req: any) {
    console.log(req);
    return this.userService.premiumStatus(req.data);
  }

  @ApiOperation({ summary: 'Banned users' })
  @ApiResponse({ status: 200, type: User })
  @Roles('admin', 'manager')
  @UseGuards(RolesGuard)
  @Post('/ban')
  async ban(@Body() dto: BanUserDto): Promise<User> {
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
