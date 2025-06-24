import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { ShoppingListProductService } from './shopping-list-product.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { UpdateShoppingListProductDto } from './dto/update-shopping-list-product.dto';

@ApiTags('Shopping List Product')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('list-product')
export class ShoppingListProductController {
  constructor(private shoppingListProductService: ShoppingListProductService) {}

  @Patch(':id/pick-up')
  async setProductAsPickedUp(@Param('id') listId: number, @Body() data: UpdateShoppingListProductDto) {
    const { productId } = data;
    return this.shoppingListProductService.setProductAsPickedUp(listId, productId);
  }

  @Patch(':id/return')
  async setProductAsReturned(@Param('id') listId: number, @Body() data: UpdateShoppingListProductDto) {
    const { productId } = data;
    return this.shoppingListProductService.setProductAsReturned(listId, productId);
  }
}
