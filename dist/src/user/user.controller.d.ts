import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getProfile(request: any): Promise<{
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    findMyLists(request: any): Promise<({
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
