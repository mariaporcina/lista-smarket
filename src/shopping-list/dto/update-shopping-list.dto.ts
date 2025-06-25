import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateShoppingListDto {
  @ApiProperty({ example: 'Compras para o jantar' })
  @MinLength(3, { message: 'Name must be at least 3 characters long.' })
  @IsString({ message: 'Name must be a string.' })
  name: string;
}
