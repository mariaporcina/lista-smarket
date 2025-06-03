import {
  Controller,
  Get,
  NotFoundException,
  Param,
  HttpException,
  HttpStatus,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';

import { TooManyRequestsException } from '../too-many-requests-exception/too-many-requests.exception';

@Controller('errors')
export class ErrorsController {
  public currentUser = {
    id: 1,
    name: 'Maria',
    email: 'maria@email.com',
    isAdmin: false,
  };

  @Get('/generic-error')
  throwHttpExceptionSimple() {
    throw new HttpException(
      'Erro: Servidor indisponível no momento.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Get('/custom-error')
  throwCustomError() {
    throw new TooManyRequestsException();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!this.currentUser.isAdmin) {
      throw new ForbiddenException(
        'Sem permissão: você não possui a permissão necessária para visualizar este recurso',
      );
    }

    if (!id || isNaN(Number(id))) {
      throw new BadRequestException(
        'ID inválido: o parâmetro ID é obrigatório e deve ser um número',
      );
    }

    if (id !== '1') {
      throw new NotFoundException(
        `Não encontrado: o recurso de ID ${id} não foi encontrado`,
      );
    }

    return { id, message: 'Recurso encontrado' };
  }
}
