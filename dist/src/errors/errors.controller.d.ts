export declare class ErrorsController {
    currentUser: {
        id: number;
        name: string;
        email: string;
        isAdmin: boolean;
    };
    throwHttpExceptionSimple(): void;
    throwCustomError(): void;
    findOne(id: string): {
        id: string;
        message: string;
    };
}
