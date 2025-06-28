import {
  Controller,
  Get,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { UserService } from './user.service';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from 'src/response/response.interceptor';

@ApiTags('User')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ResponseInterceptor)
@ApiBearerAuth()
@Controller({path: 'users', version: '1'})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Listar usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso.' })
  @Roles(Role.ADMIN) 
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
  @Get('profile/lists')
  async findMyLists(@Req() request: any) {
    const userId = await request.user.id;
    return this.userService.findMyLists(userId);
  }
}
