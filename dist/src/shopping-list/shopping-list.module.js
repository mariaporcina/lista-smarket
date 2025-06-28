"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingListModule = void 0;
const common_1 = require("@nestjs/common");
const shopping_list_controller_1 = require("./shopping-list.controller");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const prisma_module_1 = require("../prisma/prisma.module");
const roles_guard_1 = require("../auth/roles.guard");
const auth_service_1 = require("../auth/auth.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const jwt_strategy_1 = require("../auth/jwt.strategy");
const prisma_service_1 = require("../prisma/prisma.service");
const shopping_list_product_service_1 = require("../shopping-list-product/shopping-list-product.service");
const shopping_list_service_1 = require("./shopping-list.service");
let ShoppingListModule = class ShoppingListModule {
};
exports.ShoppingListModule = ShoppingListModule;
exports.ShoppingListModule = ShoppingListModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'minha_chave_secreta',
                signOptions: { expiresIn: '1h' },
            }),
        ],
        controllers: [shopping_list_controller_1.ShoppingListController],
        providers: [
            shopping_list_service_1.ShoppingListService,
            auth_service_1.AuthService,
            prisma_service_1.PrismaService,
            jwt_strategy_1.JwtStrategy,
            jwt_auth_guard_1.JwtAuthGuard,
            roles_guard_1.RolesGuard,
            shopping_list_product_service_1.ShoppingListProductService
        ]
    })
], ShoppingListModule);
//# sourceMappingURL=shopping-list.module.js.map