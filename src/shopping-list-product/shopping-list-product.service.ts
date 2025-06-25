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
    const product = await this.findOne(listId, productId);
    if (!product) {
      throw new NotFoundException("Product not found");
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
    const product = await this.findOne(listId, productId);
    if (!product) {
      throw new NotFoundException("Product not found");
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
