import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingListProductService } from './shopping-list-product.service';

describe('ShoppingListProductService', () => {
  let service: ShoppingListProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShoppingListProductService],
    }).compile();

    service = module.get<ShoppingListProductService>(ShoppingListProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
