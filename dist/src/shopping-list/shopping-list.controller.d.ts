import { ShoppingListService } from './shopping-list.service';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { UpdateShoppingListDto } from './dto/update-shopping-list.dto';
import { UpdateProductsShoppingListDto } from './dto/update-products-shopping-list.dto';
export declare class ShoppingListController {
    private readonly shoppingListService;
    constructor(shoppingListService: ShoppingListService);
    create(data: CreateShoppingListDto, request: any): Promise<{
        id: number;
        name: string;
        ownerId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<({
        ShoppingListProduct: ({
            product: {
                id: number;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                categoryId: number;
            };
        } & {
            createdAt: Date;
            updatedAt: Date;
            shoppingListId: number;
            productId: number;
            pickedUp: boolean;
        })[];
    } & {
        id: number;
        name: string;
        ownerId: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        ShoppingListProduct: ({
            product: {
                id: number;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                categoryId: number;
            };
        } & {
            createdAt: Date;
            updatedAt: Date;
            shoppingListId: number;
            productId: number;
            pickedUp: boolean;
        })[];
    } & {
        id: number;
        name: string;
        ownerId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, data: UpdateShoppingListDto): Promise<{
        id: number;
        name: string;
        ownerId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: number;
        name: string;
        ownerId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    addProductToList(data: UpdateProductsShoppingListDto, listId: number): Promise<{
        id: number;
        name: string;
        ownerId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    removeProductsFromList(listId: number, data: UpdateProductsShoppingListDto): Promise<{
        id: number;
        name: string;
        ownerId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
