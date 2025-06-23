import {
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateShoppingListDto {
  @MinLength(3, { message: 'Name must be at least 3 characters long.' })
  @IsString({ message: 'Name must be a string.' })
  name: string;
}
