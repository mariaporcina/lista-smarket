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
exports.ShoppingListProductController = void 0;
const common_1 = require("@nestjs/common");
const shopping_list_product_service_1 = require("./shopping-list-product.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const update_shopping_list_product_dto_1 = require("./dto/update-shopping-list-product.dto");
const response_interceptor_1 = require("../response/response.interceptor");
let ShoppingListProductController = class ShoppingListProductController {
    shoppingListProductService;
    constructor(shoppingListProductService) {
        this.shoppingListProductService = shoppingListProductService;
    }
    async setProductAsPickedUp(listId, data) {
        const { productId } = data;
        return this.shoppingListProductService.setProductAsPickedUp(listId, productId);
    }
    async setProductAsReturned(listId, data) {
        const { productId } = data;
        return this.shoppingListProductService.setProductAsReturned(listId, productId);
    }
};
exports.ShoppingListProductController = ShoppingListProductController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Marca produtos da lista de compra como "pegos"' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de compra atualizada com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lista de compra não encontrada.' }),
    (0, swagger_1.ApiBody)({ type: update_shopping_list_product_dto_1.UpdateShoppingListProductDto }),
    (0, common_1.Patch)(':id/pick-up'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_shopping_list_product_dto_1.UpdateShoppingListProductDto]),
    __metadata("design:returntype", Promise)
], ShoppingListProductController.prototype, "setProductAsPickedUp", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Marca produtos da lista de compra como "retornados"' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de compra atualizada com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lista de compra não encontrada.' }),
    (0, swagger_1.ApiBody)({ type: update_shopping_list_product_dto_1.UpdateShoppingListProductDto }),
    (0, common_1.Patch)(':id/return'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_shopping_list_product_dto_1.UpdateShoppingListProductDto]),
    __metadata("design:returntype", Promise)
], ShoppingListProductController.prototype, "setProductAsReturned", null);
exports.ShoppingListProductController = ShoppingListProductController = __decorate([
    (0, swagger_1.ApiTags)('Shopping List Product'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResponseInterceptor),
    (0, common_1.Controller)('list-product'),
    __metadata("design:paramtypes", [shopping_list_product_service_1.ShoppingListProductService])
], ShoppingListProductController);
//# sourceMappingURL=shopping-list-product.controller.js.map