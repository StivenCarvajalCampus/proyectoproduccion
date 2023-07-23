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
export class Categoria {
    constructor(id_categoria, nombre_categoria, id_producto) {
        this.id_categoria = id_categoria;
        this.nombre_categoria = nombre_categoria;
        this.id_producto = id_producto;
    }
}
__decorate([
    Expose({ name: 'id_categoria' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value === 'number')
            return Math.floor(value);
        else
            throw { status: 400, message: "El dato id_categoria no cumple con los parametros establecidos debe ser numerico" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Categoria.prototype, "id_categoria", void 0);
__decorate([
    Expose({ name: 'nombre_categoria' }),
    Transform(({ value }) => {
        if (/^[a-z A-Z0-9]+$/.test(value))
            return value;
        else
            throw { status: 400, message: "El parametro nombre_categoria no cumple con los parametros establecidos" };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], Categoria.prototype, "nombre_categoria", void 0);
__decorate([
    Expose({ name: 'id_producto' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value === 'number')
            return Math.floor(value);
        else
            throw { status: 400, message: "El dato id_producto debe ser numerico" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Categoria.prototype, "id_producto", void 0);
