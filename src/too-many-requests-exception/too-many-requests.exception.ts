import { HttpException, HttpStatus } from '@nestjs/common';

export class TooManyRequestsException extends HttpException {
  constructor() {
    super(
      'Excesso de requisições: você ultrapassou o limite de requisições. Tente novamente em alguns minutos.',
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }
}
