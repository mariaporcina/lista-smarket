import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async getProfile(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    
    return {
      name: user!.name,
      email: user!.email,
      role: user!.role,
    };
  }

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
