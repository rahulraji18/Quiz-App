import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Register User',
  })
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @ApiOperation({
    summary: 'Login User',
  })
  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
