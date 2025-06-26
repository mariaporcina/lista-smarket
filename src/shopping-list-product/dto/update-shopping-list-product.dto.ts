import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateShoppingListProductDto {
  @ApiProperty({ example: 2, description: 'ID do produto a ser atualizado na lista de compras.' })
  @IsNumber({}, { message: 'Product Id must be a number.' })
  productId: number;
}
