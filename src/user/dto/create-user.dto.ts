import {
  IsString,
  // MinLength,
  IsEmail,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'O nome deve ser uma string válida.' })
  name: string;

  @IsEmail({}, { message: 'Email must be a valid email address.' })
  email: string;

  @IsOptional()
  @IsBoolean({ message: 'isAdmin must be a boolean value.' })
  isAdmin?: boolean;

  // @IsString({ message: 'Password must be a string.' })
  // @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  // password: string;
}
