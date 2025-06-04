import {
  IsString,
  MinLength,
  IsEmail,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class RegisterDto {
  @IsString({ message: 'O nome deve ser uma string válida.' })
  name: string;

  @IsEmail({}, { message: 'Email must be a valid email address.' })
  email: string;

  @IsOptional()
  @IsBoolean({ message: 'admin must be a boolean value.' })
  admin?: boolean;

  @IsString({ message: 'Password must be a string.' })
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  password: string;
}
