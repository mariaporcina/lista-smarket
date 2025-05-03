import { Injectable } from '@nestjs/common';

import Product from '../schemas/Product';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    { id: 1, name: 'Arroz' },
    { id: 2, name: 'Feijão' },
    { id: 3, name: 'Farinha de trigo' },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find((product) => product.id === Number(id));
  }

  create(product: Product) {
    this.products.push({ ...product, id: this.products.length + 1 });
    return product;
  }

  update(id: number, updateData: Product | Partial<Product>) {
    const product = this.findOne(Number(id));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    Object.assign(product, updateData);
    return product;
  }

  // update(id: number, product: Product) {
  //   const index = this.products.findIndex((p) => p.id === Number(id));
  //   if (index > -1) {
  //     this.products[index] = { ...this.products[index], ...product };
  //     return this.products[index];
  //   }
  //   return null;
  // }

  remove(id: number) {
    const index = this.products.findIndex((p) => p.id === Number(id));
    if (index > -1) {
      return this.products.splice(index, 1);
    }
    return null;
  }
}
