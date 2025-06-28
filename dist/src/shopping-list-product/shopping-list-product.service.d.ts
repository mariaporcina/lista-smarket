import { PrismaService } from 'src/prisma/prisma.service';
export declare class ShoppingListProductService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(listId: number, productId: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        shoppingListId: number;
        productId: number;
        pickedUp: boolean;
    } | null>;
    setProductAsPickedUp(listId: number, productId: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        shoppingListId: number;
        productId: number;
        pickedUp: boolean;
    }>;
    setProductAsReturned(listId: number, productId: number): Promise<{
        createdAt: Date;
        updatedAt: Date;
        shoppingListId: number;
        productId: number;
        pickedUp: boolean;
    }>;
}
