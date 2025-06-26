import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShoppingListProductService {
  constructor(private prisma: PrismaService) {}

  async findOne(listId: number, productId: number) {
    return await this.prisma.shoppingListProduct.findUnique({
      where: {
        shoppingListId_productId: {
          shoppingListId: listId,
          productId: productId,
        },
      },
    });
  }

  async setProductAsPickedUp(
    listId: number,
    productId: number,
  ) {
    const list = await this.prisma.shoppingList.findUnique({
      where: { id: listId },
    });
    if (!list) {
      throw new NotFoundException(`Shopping list with id ${listId} not found`);
    }

    const product = await this.findOne(listId, productId);
    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found on shopping list with id ${listId}`);
    }

    return await this.prisma.shoppingListProduct.update({
      where: {
        shoppingListId_productId: {
          shoppingListId: listId,
          productId: productId,
        },
      },
      data: {
        pickedUp: true,
      },
    });
  }

  async setProductAsReturned(
    listId: number,
    productId: number,
  ) {
    const list = await this.prisma.shoppingList.findUnique({
      where: { id: listId },
    });
    if (!list) {
      throw new NotFoundException(`Shopping list with id ${listId} not found`);
    }

    const product = await this.findOne(listId, productId);
    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found on shopping list with id ${listId}`);
    }

    return await this.prisma.shoppingListProduct.update({
      where: {
        shoppingListId_productId: {
          shoppingListId: listId,
          productId: productId,
        },
      },
      data: {
        pickedUp: false,
      },
    });
  }
}
