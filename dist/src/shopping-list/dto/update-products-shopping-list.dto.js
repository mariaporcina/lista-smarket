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
exports.UpdateProductsShoppingListDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateProductsShoppingListDto {
    productsIds;
}
exports.UpdateProductsShoppingListDto = UpdateProductsShoppingListDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: [1, 2, 3] }),
    (0, class_validator_1.IsArray)({ message: 'ProductsIds deve ser um array de números.' }),
    (0, class_validator_1.ArrayNotEmpty)({ message: 'ProductsIds array não pode estar vazio.' }),
    (0, class_validator_1.IsInt)({ each: true, message: 'Cada ProductsId deve ser um inteiro.' }),
    __metadata("design:type", Array)
], UpdateProductsShoppingListDto.prototype, "productsIds", void 0);
//# sourceMappingURL=update-products-shopping-list.dto.js.map