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
import { ProductService } from './product.service';

import { Product } from './product.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('products')
export class ProductController {
  constructor(private readonly featureService: ProductService) {}

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
