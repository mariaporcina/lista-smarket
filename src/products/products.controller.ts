import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { ProductsService } from './products.service';

import { Product } from './products.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly featureService: ProductsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() product: Product) {
    return this.featureService.create(product);
  }
  @Get()
  findAll() {
    return this.featureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.featureService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() product: Product) {
    return this.featureService.update(id, product);
  }

  @Patch(':id')
  partialUpdate(@Param('id') id: number, @Body() product: Partial<Product>) {
    return this.featureService.update(id, product);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number) {
    return this.featureService.remove(id);
  }
}
