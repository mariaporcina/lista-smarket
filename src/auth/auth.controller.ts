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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
