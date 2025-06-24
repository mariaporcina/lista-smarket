import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShoppingListService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ShoppingListCreateInput) {
    return this.prisma.shoppingList.create({ data });
  }

  async findAll() {
    return this.prisma.shoppingList.findMany({
      include: {
        ShoppingListProduct: {
          include: {
            product: true,
          }
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    console.log(id);
    return this.prisma.shoppingList.findUnique({
      where: { id },
      include: {
        ShoppingListProduct: {
          include: {
            product: true,
          },
          orderBy: {
            product: {
              name: 'asc',
            },
          },
        },
      },
    });
  }

  async update(id: number, data: Prisma.ShoppingListUpdateInput) {
    return this.prisma.shoppingList.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.shoppingList.delete({ where: { id } });
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
