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
    return this.prisma.shoppingList.findMany();
  }

  async findOne(id: number) {
    console.log(id);
    return this.prisma.shoppingList.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.ShoppingListUpdateInput) {
    return this.prisma.shoppingList.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.shoppingList.delete({ where: { id } });
  }

  // async addItemToList(listId: number, itemId: number) {
  //   return this.prisma.shoppingList.update({
  //     where: { id: listId },
  //     data: {
  //       items: {
  //         connect: { id: itemId },
  //       },
  //     },
  //   });
  // }
}
