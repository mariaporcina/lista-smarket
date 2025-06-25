import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingListProductController } from './shopping-list-product.controller';

describe('ShoppingListProductController', () => {
  let controller: ShoppingListProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoppingListProductController],
    }).compile();

    controller = module.get<ShoppingListProductController>(ShoppingListProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
