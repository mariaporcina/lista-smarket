import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ShoppingListService } from './shopping-list.service';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Prisma, Role } from '.prisma/client/default';
import { Roles } from 'src/auth/roles.decorator';
import { UpdateShoppingListDto } from './dto/update-shopping-list.dto';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('Shopping List')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('lists')
export class ShoppingListController {
  constructor(private readonly shoppingListService: ShoppingListService) {}

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

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.shoppingListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shoppingListService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateShoppingListDto) {
    return this.shoppingListService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shoppingListService.remove(Number(id));
  }
}
