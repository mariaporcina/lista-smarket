import { ShoppingListProductService } from './shopping-list-product.service';
import { UpdateShoppingListProductDto } from './dto/update-shopping-list-product.dto';
export declare class ShoppingListProductController {
    private shoppingListProductService;
    constructor(shoppingListProductService: ShoppingListProductService);
    setProductAsPickedUp(listId: number, data: UpdateShoppingListProductDto): Promise<{
        createdAt: Date;
        updatedAt: Date;
        shoppingListId: number;
        productId: number;
        pickedUp: boolean;
    }>;
    setProductAsReturned(listId: number, data: UpdateShoppingListProductDto): Promise<{
        createdAt: Date;
        updatedAt: Date;
        shoppingListId: number;
        productId: number;
        pickedUp: boolean;
    }>;
}
