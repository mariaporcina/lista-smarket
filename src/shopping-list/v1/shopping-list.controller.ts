import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ShoppingListService } from './shopping-list.service';
import { CreateShoppingListDto } from '../dto/create-shopping-list.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Prisma, Role } from '.prisma/client/default';
import { Roles } from 'src/auth/roles.decorator';
import { UpdateShoppingListDto } from '../dto/update-shopping-list.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { UpdateProductsShoppingListDto } from '../dto/update-products-shopping-list.dto';
import { ResponseInterceptor } from 'src/response/response.interceptor';

@ApiTags('Shopping List')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ResponseInterceptor)
@ApiBearerAuth()
@Controller({path: 'lists', version: '1'})
export class ShoppingListController {
  constructor(private readonly shoppingListService: ShoppingListService) {}

  @ApiOperation({ summary: 'Realiza registro de lista de compra' })
  @ApiResponse({ status: 201, description: 'Lista de compra registrada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Nome é obrigatório e deve ter pelo menos 3 caracteres.' })
  @ApiBody({ type: CreateShoppingListDto })
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() data: CreateShoppingListDto, @Req() request: any) {
    const user: Prisma.UserCreateNestedOneWithoutShoppingListInput = {
      connect: {
        id: request.user.id,
        email: request.user.email,
        name: request.user.name,
        role: request.user.role as Role,
      },
    };
    return this.shoppingListService.create({ ...data, owner: user });
  }

  @ApiOperation({ summary: 'Lista todas as listas de compra' })
  @ApiResponse({ status: 200 })
  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.shoppingListService.findAll();
  }

  @ApiOperation({ summary: 'Retorna a lista de compra com o id informado, se existir' })
  @ApiResponse({ status: 200, description: 'Lista de compra encontrada.' })
  @ApiResponse({ status: 404, description: 'Lista de compra não encontrada.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shoppingListService.findOne(Number(id));
  }
  
  @ApiOperation({ summary: 'Atualiza de lista de compra' })
  @ApiResponse({ status: 200, description: 'Lista de compra atualizada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Nome é obrigatório e deve ter pelo menos 3 caracteres.' })
  @ApiResponse({ status: 404, description: 'Lista de compra não encontrada.' })
  @ApiBody({ type: UpdateShoppingListDto })
  @Roles(Role.ADMIN)
  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateShoppingListDto) {
    return this.shoppingListService.update(Number(id), data);
  }

  @ApiOperation({ summary: 'Deleta uma lista de compra' })
  @ApiResponse({ status: 204, description: 'Lista de compra deletada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Lista de compra não encontrada.' })
  @Roles(Role.ADMIN)
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.shoppingListService.remove(Number(id));
  }

  @ApiOperation({ summary: 'Adiciona produtos na lista de compra' })
  @ApiResponse({ status: 201, description: 'Lista de compra atualizada com sucesso.' })
  @ApiResponse({ status: 400, description: 'ProductsIds deve ser um array de números.' })
  @ApiResponse({ status: 404, description: 'Lista de compra não encontrada.' })
  @ApiBody({ type: UpdateProductsShoppingListDto })
  @Post(':id/add-products')
  async addProductToList(@Body() data: UpdateProductsShoppingListDto, @Param('id') listId: number) {
    const { productsIds } = data;
    return this.shoppingListService.addProductToList(listId, productsIds);
  }

  @ApiOperation({ summary: 'Remove produtos da lista de compra' })
  @ApiResponse({ status: 200, description: 'Lista de compra atualizada com sucesso.' })
  @ApiResponse({ status: 400, description: 'ProductsIds deve ser um array de números.' })
  @ApiResponse({ status: 404, description: 'Lista de compra não encontrada.' })
  @ApiBody({ type: UpdateProductsShoppingListDto })
  @Delete(':id/remove-products')
  async removeProductsFromList(@Param('id') listId: number, @Body() data: UpdateProductsShoppingListDto) {
    const { productsIds } = data;
    return this.shoppingListService.removeProductsFromList(listId, productsIds);
  }
}

