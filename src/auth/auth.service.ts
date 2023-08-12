import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/users.model';
import { RolesService } from '../roles/roles.service';
import { IJWTPayload } from './interfaces/jwt.auth.interface';
import { IToken } from './interfaces/token.interface';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    // private roleService: RolesService,
    private jwtService: JwtService,
  ) {}

  async registration(userDto: CreateUserDto): Promise<IToken> {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  async login(userDto: LoginUserDto): Promise<IToken> {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async verify(token: string): Promise<IJWTPayload> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (e) {
      console.log(new Date().toISOString(), token);
      throw new UnauthorizedException();
    }
  }

  private async generateToken(user: User): Promise<IToken> {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: LoginUserDto): Promise<User> {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (!user && !passwordEquals) {
      throw new UnauthorizedException({ message: 'Wrong email or password' });
    }

    return user;
  }
}
