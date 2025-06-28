import { ShoppingListService } from './shopping-list.service';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { UpdateShoppingListDto } from './dto/update-shopping-list.dto';
import { UpdateProductsShoppingListDto } from './dto/update-products-shopping-list.dto';
export declare class ShoppingListController {
    private readonly shoppingListService;
    constructor(shoppingListService: ShoppingListService);
    create(data: CreateShoppingListDto, request: any): Promise<{
        createdAt: Date;
        updatedAt: Date;
        name: string;
        id: number;
        ownerId: number;
    }>;
    findAll(): Promise<({
        ShoppingListProduct: ({
            product: {
                createdAt: Date;
                updatedAt: Date;
                name: string;
                id: number;
                categoryId: number;
            };
        } & {
            shoppingListId: number;
            productId: number;
            pickedUp: boolean;
            createdAt: Date;
            updatedAt: Date;
        })[];
    } & {
        createdAt: Date;
        updatedAt: Date;
        name: string;
        id: number;
        ownerId: number;
    })[]>;
    findOne(id: string): Promise<{
        ShoppingListProduct: ({
            product: {
                createdAt: Date;
                updatedAt: Date;
                name: string;
                id: number;
                categoryId: number;
            };
        } & {
            shoppingListId: number;
            productId: number;
            pickedUp: boolean;
            createdAt: Date;
            updatedAt: Date;
        })[];
    } & {
        createdAt: Date;
        updatedAt: Date;
        name: string;
        id: number;
        ownerId: number;
    }>;
    update(id: string, data: UpdateShoppingListDto): Promise<{
        createdAt: Date;
        updatedAt: Date;
        name: string;
        id: number;
        ownerId: number;
    }>;
    remove(id: string): Promise<{
        createdAt: Date;
        updatedAt: Date;
        name: string;
        id: number;
        ownerId: number;
    }>;
    addProductToList(data: UpdateProductsShoppingListDto, listId: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        name: string;
        id: number;
        ownerId: number;
    }>;
    removeProductsFromList(listId: number, data: UpdateProductsShoppingListDto): Promise<{
        createdAt: Date;
        updatedAt: Date;
        name: string;
        id: number;
        ownerId: number;
    }>;
}
