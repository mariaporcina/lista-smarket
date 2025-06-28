import { PrismaService } from '../prisma/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getProfile(userId: number): Promise<{
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    findMyLists(userId: number): Promise<({
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
}
