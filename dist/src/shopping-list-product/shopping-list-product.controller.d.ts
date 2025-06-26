import { ShoppingListProductService } from './shopping-list-product.service';
import { UpdateShoppingListProductDto } from './dto/update-shopping-list-product.dto';
export declare class ShoppingListProductController {
    private shoppingListProductService;
    constructor(shoppingListProductService: ShoppingListProductService);
    setProductAsPickedUp(listId: number, data: UpdateShoppingListProductDto): Promise<{
        productId: number;
        shoppingListId: number;
        pickedUp: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    setProductAsReturned(listId: number, data: UpdateShoppingListProductDto): Promise<{
        productId: number;
        shoppingListId: number;
        pickedUp: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
