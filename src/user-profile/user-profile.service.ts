import { Prisma } from '.prisma/client/default';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserProfileService {
  constructor(private prisma: PrismaService) {}

  async findMyLists(userId: number) {
    return this.prisma.shoppingList.findMany({
      where: { ownerId: userId },
    });
  }

  async addProductToList(
    listId: number,
    products: number[],
  ) {
    return await this.prisma.shoppingList.update({
      where: { id: listId },
      data: {
        ShoppingListProduct: {
          create: products.map((productId) => ({
            productId: productId,
          })),
        }
      },
    });
  }

  async removeProductsFromList(
    listId: number,
    products: number[],
  ) {
    return await this.prisma.shoppingList.update({
      where: { id: listId },
      data: {
        ShoppingListProduct: {
          deleteMany: {
            productId: {
              in: products,
            },
          },
        },
      },
    });
  }
}
