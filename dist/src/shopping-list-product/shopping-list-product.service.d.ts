import { PrismaService } from '../prisma/prisma.service';
export declare class ShoppingListProductService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(listId: number, productId: number): Promise<{
        shoppingListId: number;
        productId: number;
        pickedUp: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    setProductAsPickedUp(listId: number, productId: number): Promise<{
        shoppingListId: number;
        productId: number;
        pickedUp: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    setProductAsReturned(listId: number, productId: number): Promise<{
        shoppingListId: number;
        productId: number;
        pickedUp: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
