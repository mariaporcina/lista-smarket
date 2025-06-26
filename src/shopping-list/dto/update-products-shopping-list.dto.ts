import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
} from 'class-validator';

export class UpdateProductsShoppingListDto {
  @ApiProperty({ example: [1, 2, 3] })
  @IsArray({ message: 'ProductsIds deve ser um array de números.' })
  @ArrayNotEmpty({ message: 'ProductsIds array não pode estar vazio.' })
  @IsInt({ each: true, message: 'Cada ProductsId deve ser um inteiro.' })
  productsIds: number[];
}
