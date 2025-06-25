import { IsNumber } from 'class-validator';

export class UpdateShoppingListProductDto {
  @IsNumber({}, { message: 'Product Id must be a number.' })
  productId: number;
}
