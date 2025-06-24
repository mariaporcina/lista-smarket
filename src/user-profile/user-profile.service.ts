import { Prisma } from '.prisma/client/default';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserProfileService {
  constructor(private prisma: PrismaService) {}

  async findMyLists(userId: number) {
    return this.prisma.shoppingList.findMany({
      where: { ownerId: userId },
      include: {
        ShoppingListProduct: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
