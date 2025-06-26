import {
  IsString,
  MinLength,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Name must be a string.' })
  name: string;

  @IsEmail({}, { message: 'Email must be a valid email address.' })
  email: string;

  @IsString({ message: 'Password must be a string.' })
  @MinLength(6, { message: 'Password must be at least 8 characters long.' })
  password: string;
}
