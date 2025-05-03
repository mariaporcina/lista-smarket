import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './products.interface';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Arroz',
      category: 'Grãos',
    },
    {
      id: 2,
      name: 'Feijão',
      category: 'Grãos',
    },
    {
      id: 3,
      name: 'Farinha de trigo',
      category: 'Farinha',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((product) => product.id === Number(id));

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  create(product: Product) {
    this.products.push({ ...product, id: this.products.length + 1 });
    return product;
  }

  update(id: number, updateData: Product | Partial<Product>) {
    const product = this.findOne(Number(id));

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    Object.assign(product, updateData);
    return product;
  }

  remove(id: number) {
    const index = this.products.findIndex((p) => p.id === Number(id));

    if (index <= -1) {
      throw new NotFoundException('Product not found');
    }

    return this.products.splice(index, 1);
  }
}
