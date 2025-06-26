import {
  IsString,
  MinLength,
  IsNumber
} from 'class-validator';

export class CreateShoppingListDto {
  @MinLength(3, { message: 'Name must be at least 3 characters long.' })
  @IsNumber({}, { message: 'Name must be a number.' })
  name: number;
}
