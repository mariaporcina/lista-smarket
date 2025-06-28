"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingListProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ShoppingListProductService = class ShoppingListProductService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findOne(listId, productId) {
        return await this.prisma.shoppingListProduct.findUnique({
            where: {
                shoppingListId_productId: {
                    shoppingListId: listId,
                    productId: productId,
                },
            },
        });
    }
    async setProductAsPickedUp(listId, productId) {
        const list = await this.prisma.shoppingList.findUnique({
            where: { id: listId },
        });
        if (!list) {
            throw new common_1.NotFoundException(`Shopping list with id ${listId} not found`);
        }
        const product = await this.findOne(listId, productId);
        if (!product) {
            throw new common_1.NotFoundException(`Product with id ${productId} not found on shopping list with id ${listId}`);
        }
        return await this.prisma.shoppingListProduct.update({
            where: {
                shoppingListId_productId: {
                    shoppingListId: listId,
                    productId: productId,
                },
            },
            data: {
                pickedUp: true,
            },
        });
    }
    async setProductAsReturned(listId, productId) {
        const list = await this.prisma.shoppingList.findUnique({
            where: { id: listId },
        });
        if (!list) {
            throw new common_1.NotFoundException(`Shopping list with id ${listId} not found`);
        }
        const product = await this.findOne(listId, productId);
        if (!product) {
            throw new common_1.NotFoundException(`Product with id ${productId} not found on shopping list with id ${listId}`);
        }
        return await this.prisma.shoppingListProduct.update({
            where: {
                shoppingListId_productId: {
                    shoppingListId: listId,
                    productId: productId,
                },
            },
            data: {
                pickedUp: false,
            },
        });
    }
};
exports.ShoppingListProductService = ShoppingListProductService;
exports.ShoppingListProductService = ShoppingListProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShoppingListProductService);
//# sourceMappingURL=shopping-list-product.service.js.map