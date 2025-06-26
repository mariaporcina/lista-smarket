import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Realiza registro de usuário com nome, email e senha' })
  @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso' })
  @ApiResponse({ status: 409, description: 'Email inválido' })
  @Post('register')
  @ApiBody({ type: RegisterDto })
  async register(@Body() data: RegisterDto) {
    const { email, password, name } = data;

    return await this.authService.register(email, password, name);
  }

  @ApiOperation({ summary: 'Realiza login com email e senha' })
  @ApiResponse({ status: 201, description: 'Login realizado com sucesso' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() data: LoginDto) {
    const { email, password } = data;

    return await this.authService.login(email, password);
  }
}
