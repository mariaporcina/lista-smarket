import { Body, Controller, Param, Patch, UseGuards, UseInterceptors } from '@nestjs/common';
import { ShoppingListProductService } from './shopping-list-product.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { UpdateShoppingListProductDto } from './dto/update-shopping-list-product.dto';
import { ResponseInterceptor } from 'src/response/response.interceptor';

@ApiTags('Shopping List Product')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ResponseInterceptor)
@Controller('list-product')
export class ShoppingListProductController {
  constructor(private shoppingListProductService: ShoppingListProductService) {}

  @ApiOperation({ summary: 'Marca produtos da lista de compra como "pegos"' })
  @ApiResponse({ status: 200, description: 'Lista de compra atualizada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Lista de compra não encontrada.' })
  @ApiBody({ type: UpdateShoppingListProductDto })
  @Patch(':id/pick-up')
  async setProductAsPickedUp(@Param('id') listId: number, @Body() data: UpdateShoppingListProductDto) {
    const { productId } = data;
    return this.shoppingListProductService.setProductAsPickedUp(listId, productId);
  }

  @ApiOperation({ summary: 'Marca produtos da lista de compra como "retornados"' })
  @ApiResponse({ status: 200, description: 'Lista de compra atualizada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Lista de compra não encontrada.' })
  @ApiBody({ type: UpdateShoppingListProductDto })
  @Patch(':id/return')
  async setProductAsReturned(@Param('id') listId: number, @Body() data: UpdateShoppingListProductDto) {
    const { productId } = data;
    return this.shoppingListProductService.setProductAsReturned(listId, productId);
  }
}
