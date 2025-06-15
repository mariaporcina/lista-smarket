import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() data: RegisterDto) {
    const { email, password, name } = data;

    return await this.authService.register(email, password, name);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() data: LoginDto) {
    const { email, password } = data;

    return await this.authService.login(email, password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getCurrentUserProfile(@Req() request: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const currentUser = await request.user;
    return {
      message: 'Você acessou uma rota protegida!',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      user: currentUser,
    };
  }
}
