import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const existingUser = await this.userService.findByEmail(data?.email);

    if (existingUser) throw new BadRequestException('User already exists');

    const hashedPassword = await bcrypt.hash(data?.password, 10);

    const user = await this.userService.create({
      ...data,
      password: hashedPassword,
    });

    return user;
  }

  async login(data: LoginDto) {
    const user = await this.userService.findByEmail(data?.email);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(data?.password, user?.password);

    if (!match) throw new UnauthorizedException('Invalid credentials');

    const payload = {
      sub: user?._id,
      email: user?.email,
      role: user?.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
