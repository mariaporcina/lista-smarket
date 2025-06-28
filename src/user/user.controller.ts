import {
  Controller,
  Get,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { UserService } from './user.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '../response/response.interceptor';

@ApiTags('User')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ResponseInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Listar usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso.' })
  @Roles("ADMIN") 
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Retornar detalhes do usuário atual' })
  @ApiResponse({ status: 200, description: 'Detalhes do usuário retornados com sucesso.' })
  @Get('profile')
  async getProfile(@Req() request: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const currentUser = await request.user;
    return this.userService.getProfile(currentUser.id);
  }

  @ApiOperation({ summary: 'Listar listas de compra do usuario atual' })
  @ApiResponse({ status: 200, description: 'Listas de compra retornadas com sucesso.' })
  @Get('lists')
  async findMyLists(@Req() request: any) {
    const userId = await request.user.id;
    return this.userService.findMyLists(userId);
  }
}
