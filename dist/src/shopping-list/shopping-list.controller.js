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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingListController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const shopping_list_service_1 = require("./shopping-list.service");
const create_shopping_list_dto_1 = require("./dto/create-shopping-list.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const client_1 = require("@prisma/client");
const roles_decorator_1 = require("../auth/roles.decorator");
const update_shopping_list_dto_1 = require("./dto/update-shopping-list.dto");
const roles_guard_1 = require("../auth/roles.guard");
const update_products_shopping_list_dto_1 = require("./dto/update-products-shopping-list.dto");
const response_interceptor_1 = require("../response/response.interceptor");
let ShoppingListController = class ShoppingListController {
    shoppingListService;
    constructor(shoppingListService) {
        this.shoppingListService = shoppingListService;
    }
    create(data, request) {
        const user = {
            connect: {
                id: request.user.id,
                email: request.user.email,
                name: request.user.name,
                role: request.user.role,
            },
        };
        return this.shoppingListService.create({ ...data, owner: user });
    }
    findAll() {
        return this.shoppingListService.findAll();
    }
    findOne(id) {
        return this.shoppingListService.findOne(Number(id));
    }
    update(id, data) {
        return this.shoppingListService.update(Number(id), data);
    }
    remove(id) {
        return this.shoppingListService.remove(Number(id));
    }
    async addProductToList(data, listId) {
        const { productsIds } = data;
        return this.shoppingListService.addProductToList(listId, productsIds);
    }
    async removeProductsFromList(listId, data) {
        const { productsIds } = data;
        return this.shoppingListService.removeProductsFromList(listId, productsIds);
    }
};
exports.ShoppingListController = ShoppingListController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Realiza registro de lista de compra' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Lista de compra registrada com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Nome é obrigatório e deve ter pelo menos 3 caracteres.' }),
    (0, swagger_1.ApiBody)({ type: create_shopping_list_dto_1.CreateShoppingListDto }),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_shopping_list_dto_1.CreateShoppingListDto, Object]),
    __metadata("design:returntype", void 0)
], ShoppingListController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Lista todas as listas de compra' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ShoppingListController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Retorna a lista de compra com o id informado, se existir' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de compra encontrada.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lista de compra não encontrada.' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShoppingListController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza de lista de compra' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de compra atualizada com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Nome é obrigatório e deve ter pelo menos 3 caracteres.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lista de compra não encontrada.' }),
    (0, swagger_1.ApiBody)({ type: update_shopping_list_dto_1.UpdateShoppingListDto }),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_shopping_list_dto_1.UpdateShoppingListDto]),
    __metadata("design:returntype", void 0)
], ShoppingListController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Deleta uma lista de compra' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Lista de compra deletada com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lista de compra não encontrada.' }),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShoppingListController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Adiciona produtos na lista de compra' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Lista de compra atualizada com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'ProductsIds deve ser um array de números.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lista de compra não encontrada.' }),
    (0, swagger_1.ApiBody)({ type: update_products_shopping_list_dto_1.UpdateProductsShoppingListDto }),
    (0, common_1.Post)(':id/add-products'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_products_shopping_list_dto_1.UpdateProductsShoppingListDto, Number]),
    __metadata("design:returntype", Promise)
], ShoppingListController.prototype, "addProductToList", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Remove produtos da lista de compra' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de compra atualizada com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'ProductsIds deve ser um array de números.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lista de compra não encontrada.' }),
    (0, swagger_1.ApiBody)({ type: update_products_shopping_list_dto_1.UpdateProductsShoppingListDto }),
    (0, common_1.Delete)(':id/remove-products'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_products_shopping_list_dto_1.UpdateProductsShoppingListDto]),
    __metadata("design:returntype", Promise)
], ShoppingListController.prototype, "removeProductsFromList", null);
exports.ShoppingListController = ShoppingListController = __decorate([
    (0, swagger_1.ApiTags)('Shopping List'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResponseInterceptor),
    (0, common_1.Controller)('lists'),
    __metadata("design:paramtypes", [shopping_list_service_1.ShoppingListService])
], ShoppingListController);
//# sourceMappingURL=shopping-list.controller.js.map