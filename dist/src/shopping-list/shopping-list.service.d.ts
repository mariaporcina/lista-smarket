import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ShoppingListProductService } from '../shopping-list-product/shopping-list-product.service';
export declare class ShoppingListService {
    private prisma;
    private shoppingListProductService;
    constructor(prisma: PrismaService, shoppingListProductService: ShoppingListProductService);
    create(data: Prisma.ShoppingListCreateInput): Promise<{
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
    findOne(id: number): Promise<{
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
    update(id: number, data: Prisma.ShoppingListUpdateInput): Promise<{
        createdAt: Date;
        updatedAt: Date;
        name: string;
        id: number;
        ownerId: number;
    }>;
    remove(id: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        name: string;
        id: number;
        ownerId: number;
    }>;
    addProductToList(listId: number, products: number[]): Promise<{
        createdAt: Date;
        updatedAt: Date;
        name: string;
        id: number;
        ownerId: number;
    }>;
    removeProductsFromList(listId: number, products: number[]): Promise<{
        createdAt: Date;
        updatedAt: Date;
        name: string;
        id: number;
        ownerId: number;
    }>;
}
