import {
  IsString,
  IsEmail,
} from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'O nome deve ser uma string válida.' })
  name: string;

  @IsEmail({}, { message: 'Email must be a valid email address.' })
  email: string;
}
