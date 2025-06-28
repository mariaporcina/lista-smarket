import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ShoppingListProductService } from '../shopping-list-product/shopping-list-product.service';

@Injectable()
export class ShoppingListService {
  constructor(private prisma: PrismaService, private shoppingListProductService: ShoppingListProductService) {}

  async create(data: Prisma.ShoppingListCreateInput) {
    return await this.prisma.shoppingList.create({ data });
  }

  async findAll() {
    return await this.prisma.shoppingList.findMany({
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
    const list = await this.prisma.shoppingList.findUnique({
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

    if (!list) {
      throw new NotFoundException(`Shopping list with id ${id} not found`);
    }

    return list;
  }

  async update(id: number, data: Prisma.ShoppingListUpdateInput) {
    const list = await this.findOne(id);
    if (!list) {
      throw new NotFoundException(`Shopping list with id ${id} not found`);
    }

    return await this.prisma.shoppingList.update({ where: { id }, data });
  }

  async remove(id: number) {
    const list = await this.findOne(id);
    if (!list) {
      throw new NotFoundException(`Shopping list with id ${id} not found`);
    }

    return await this.prisma.shoppingList.delete({ where: { id } });
  }

  async addProductToList(
    listId: number,
    products: number[],
  ) {
    const list = await this.findOne(listId);
    if (!list) {
      throw new NotFoundException(`Shopping list with id ${listId} not found`);
    }

    return await this.prisma.shoppingList.update({
      where: { id: listId },
      data: {
        ShoppingListProduct: {
          create: await Promise.all(products.map(async (productId) => {
            const existingProducts = await this.shoppingListProductService.findOne(listId, productId);

            if (existingProducts) {
              throw new BadRequestException("Product already exists in the shopping list");
            }
            return { productId: productId }
          })),
        }
      },
    });
  }

  async removeProductsFromList(
    listId: number,
    products: number[],
  ) {
    const list = await this.findOne(listId);
    if (!list) {
      throw new NotFoundException(`Shopping list with id ${listId} not found`);
    }

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
