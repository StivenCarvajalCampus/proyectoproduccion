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
export class Productos {
    constructor(id_producto, nombre_producto, descripcion, precio_venta, unidad_medida) {
        this.id_producto = id_producto;
        this.nombre_producto = nombre_producto;
        this.descripcion = descripcion;
        this.precio_venta = precio_venta;
        this.unidad_medida = unidad_medida;
    }
}
__decorate([
    Expose({ name: 'id_producto' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value === 'number')
            return Math.floor(value);
        else
            throw { status: 400, message: "El dato id_producto no cumple con los parametros establecidos" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Productos.prototype, "id_producto", void 0);
__decorate([
    Expose({ name: 'nombre_producto' }),
    Transform(({ value }) => {
        if (/^[a-z A-Z0-9]+$/.test(value))
            return value;
        else
            throw { status: 400, message: "El parametro nombre_producto no cumple con los parametros establecidos" };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], Productos.prototype, "nombre_producto", void 0);
__decorate([
    Expose({ name: 'descripcion' }),
    Transform(({ value }) => {
        if (/^[a-z A-Z0-9]+$/.test(value))
            return value;
        else
            throw { status: 400, message: "El parametro descripcion no cumple con los parametros establecidos" };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], Productos.prototype, "descripcion", void 0);
__decorate([
    Expose({ name: 'precio_venta' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value === 'number')
            return Math.floor(value);
        else
            throw { status: 400, message: "El dato precio de venta debe ser numerico" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Productos.prototype, "precio_venta", void 0);
__decorate([
    Expose({ name: 'unidad_medida' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value === 'number')
            return Math.floor(value);
        else
            throw { status: 400, message: "El dato unidad de medida debe ser numerico y se refiere a la cantidad del producto" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Productos.prototype, "unidad_medida", void 0);
