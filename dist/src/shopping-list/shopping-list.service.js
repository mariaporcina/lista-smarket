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
exports.ShoppingListService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const shopping_list_product_service_1 = require("../shopping-list-product/shopping-list-product.service");
let ShoppingListService = class ShoppingListService {
    prisma;
    shoppingListProductService;
    constructor(prisma, shoppingListProductService) {
        this.prisma = prisma;
        this.shoppingListProductService = shoppingListProductService;
    }
    async create(data) {
        return await this.prisma.shoppingList.create({ data });
    }
    async findAll() {
        return await this.prisma.shoppingList.findMany({
            include: {
                ShoppingListProduct: {
                    include: {
                        product: true,
                    }
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async findOne(id) {
        const list = await this.prisma.shoppingList.findUnique({
            where: { id },
            include: {
                ShoppingListProduct: {
                    include: {
                        product: true,
                    },
                    orderBy: {
                        product: {
                            name: 'asc',
                        },
                    },
                },
            },
        });
        if (!list) {
            throw new common_1.NotFoundException(`Shopping list with id ${id} not found`);
        }
        return list;
    }
    async update(id, data) {
        const list = await this.findOne(id);
        if (!list) {
            throw new common_1.NotFoundException(`Shopping list with id ${id} not found`);
        }
        return await this.prisma.shoppingList.update({ where: { id }, data });
    }
    async remove(id) {
        const list = await this.findOne(id);
        if (!list) {
            throw new common_1.NotFoundException(`Shopping list with id ${id} not found`);
        }
        return await this.prisma.shoppingList.delete({ where: { id } });
    }
    async addProductToList(listId, products) {
        const list = await this.findOne(listId);
        if (!list) {
            throw new common_1.NotFoundException(`Shopping list with id ${listId} not found`);
        }
        return await this.prisma.shoppingList.update({
            where: { id: listId },
            data: {
                ShoppingListProduct: {
                    create: await Promise.all(products.map(async (productId) => {
                        const existingProducts = await this.shoppingListProductService.findOne(listId, productId);
                        if (existingProducts) {
                            throw new common_1.BadRequestException("Product already exists in the shopping list");
                        }
                        return { productId: productId };
                    })),
                }
            },
        });
    }
    async removeProductsFromList(listId, products) {
        const list = await this.findOne(listId);
        if (!list) {
            throw new common_1.NotFoundException(`Shopping list with id ${listId} not found`);
        }
        return await this.prisma.shoppingList.update({
            where: { id: listId },
            data: {
                ShoppingListProduct: {
                    deleteMany: {
                        productId: {
                            in: products,
                        },
                    },
                },
            },
        });
    }
};
exports.ShoppingListService = ShoppingListService;
exports.ShoppingListService = ShoppingListService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, shopping_list_product_service_1.ShoppingListProductService])
], ShoppingListService);
//# sourceMappingURL=shopping-list.service.js.map