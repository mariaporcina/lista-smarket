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
exports.ErrorsController = void 0;
const common_1 = require("@nestjs/common");
const too_many_requests_exception_1 = require("../too-many-requests-exception/too-many-requests.exception");
let ErrorsController = class ErrorsController {
    currentUser = {
        id: 1,
        name: 'Maria',
        email: 'maria@email.com',
        isAdmin: false,
    };
    throwHttpExceptionSimple() {
        throw new common_1.HttpException('Erro: Servidor indisponível no momento.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throwCustomError() {
        throw new too_many_requests_exception_1.TooManyRequestsException();
    }
    findOne(id) {
        if (!this.currentUser.isAdmin) {
            throw new common_1.ForbiddenException('Sem permissão: você não possui a permissão necessária para visualizar este recurso');
        }
        if (!id || isNaN(Number(id))) {
            throw new common_1.BadRequestException('ID inválido: o parâmetro ID é obrigatório e deve ser um número');
        }
        if (id !== '1') {
            throw new common_1.NotFoundException(`Não encontrado: o recurso de ID ${id} não foi encontrado`);
        }
        return { id, message: 'Recurso encontrado' };
    }
};
exports.ErrorsController = ErrorsController;
__decorate([
    (0, common_1.Get)('/generic-error'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ErrorsController.prototype, "throwHttpExceptionSimple", null);
__decorate([
    (0, common_1.Get)('/custom-error'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ErrorsController.prototype, "throwCustomError", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ErrorsController.prototype, "findOne", null);
exports.ErrorsController = ErrorsController = __decorate([
    (0, common_1.Controller)('errors')
], ErrorsController);
//# sourceMappingURL=errors.controller.js.map