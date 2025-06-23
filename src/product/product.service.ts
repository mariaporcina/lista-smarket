import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './product.interface';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  create(product: Prisma.ProductCreateInput) {
    return this.prisma.product.create({
      data: product,
    });
  }

  findAll() {
    return this.prisma.product.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  findOne(id: number) {
    const product = this.prisma.product.findUnique({
      where: { id: Number(id) },
    });

    return product;
    // if (!product) {
    //   throw new NotFoundException('Product not found');
    // }
  }

  

  update(id: number, updateData: Product | Partial<Product>) {
    return this.prisma.product.update({
      where: { id: Number(id) },
      data: updateData,
    });
    // if (!product) {
    //   throw new NotFoundException('Product not found');
    // }
  }

  remove(id: number) {
    return this.prisma.product.delete({
      where: { id: Number(id) },
    });
  }
}
