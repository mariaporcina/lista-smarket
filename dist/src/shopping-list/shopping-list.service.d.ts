import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShoppingListProductService } from 'src/shopping-list-product/shopping-list-product.service';
export declare class ShoppingListService {
    private prisma;
    private shoppingListProductService;
    constructor(prisma: PrismaService, shoppingListProductService: ShoppingListProductService);
    create(data: Prisma.ShoppingListCreateInput): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        ownerId: number;
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
        createdAt: Date;
        updatedAt: Date;
        ownerId: number;
    })[]>;
    findOne(id: number): Promise<{
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
        createdAt: Date;
        updatedAt: Date;
        ownerId: number;
    }>;
    update(id: number, data: Prisma.ShoppingListUpdateInput): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        ownerId: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        ownerId: number;
    }>;
    addProductToList(listId: number, products: number[]): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        ownerId: number;
    }>;
    removeProductsFromList(listId: number, products: number[]): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        ownerId: number;
    }>;
}
