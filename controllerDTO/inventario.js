var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Transform } from 'class-transformer';
export class Inventario {
    constructor(id_inventario, cantidad_stock, id_producto) {
        this.id_inventario = id_inventario;
        this.cantidad_stock = cantidad_stock;
        this.id_producto = id_producto;
    }
}
__decorate([
    Expose({ name: 'id_inventario' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value === 'number')
            return Math.floor(value);
        else
            throw { status: 400, message: "El dato id_inventario no cumple con los parametros establecidos" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Inventario.prototype, "id_inventario", void 0);
__decorate([
    Expose({ name: 'cantidad_stock' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value === 'number')
            return Math.floor(value);
        else
            throw { status: 400, message: "El dato cantidad de stock debe ser numerico" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Inventario.prototype, "cantidad_stock", void 0);
__decorate([
    Expose({ name: 'id_producto' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value === 'number')
            return Math.floor(value);
        else
            throw { status: 400, message: "El dato cantidad de stock debe ser numerico" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Inventario.prototype, "id_producto", void 0);
