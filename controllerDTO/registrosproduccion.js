var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Type, Transform } from 'class-transformer';
import { IsNotEmpty, IsDate } from 'class-validator';
export class Registros {
    constructor(id_registro, fecha, id_producto, cantidad_producida, costo_total_producto, id_insumos) {
        this.id_registro = id_registro;
        this.fecha = fecha;
        this.id_producto = id_producto;
        this.cantidad_producida = cantidad_producida;
        this.costo_total_producto = costo_total_producto;
        this.id_imsumos = id_insumos;
    }
}
__decorate([
    Expose({ name: 'id_registro' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value === 'number')
            return Math.floor(value);
        else
            throw { status: 400, message: "El dato id_registro no cumple con los parametros establecidos" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Registros.prototype, "id_registro", void 0);
__decorate([
    Expose({ name: 'fecha_produccion' }),
    Type(() => Date) // Indicamos que el campo debe ser tratado como tipo Date
    ,
    Transform(({ value }) => {
        const fecha = new Date(value);
        if (isNaN(fecha.getTime())) {
            throw {
                status: 400,
                message: "El parámetro 'fecha_produccion' no es una fecha válida.",
            };
        }
        return fecha;
    }),
    Expose({ name: 'id_producto' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value === 'number')
            return Math.floor(value);
        else
            throw { status: 400, message: "El dato id_producto no cumple con los parametros establecidos" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Registros.prototype, "id_producto", void 0);
__decorate([
    Expose({ name: 'cantidad_producida' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value === 'number')
            return Math.floor(value);
        else
            throw { status: 400, message: "El dato cantidad_producida no cumple con los parametros establecidos" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Registros.prototype, "cantidad_producida", void 0);
__decorate([
    Expose({ name: 'costo_total_producto' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value === 'number')
            return Math.floor(value);
        else
            throw { status: 400, message: "El parametro costo producto no cumple con las condiciones necesarias" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Registros.prototype, "costo_total_producto", void 0);
__decorate([
    IsNotEmpty({ message: "El campo 'fecha' no puede estar vacío." }),
    IsDate({ message: "El campo 'fecha' debe ser una fecha válida." }),
    __metadata("design:type", Date)
], Registros.prototype, "fecha", void 0);
__decorate([
    Expose({ name: 'id_insumos' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value === 'number')
            return Math.floor(value);
        else
            throw { status: 400, message: "El parametro id_insumos no cumple con las condiciones necesarias" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Registros.prototype, "id_imsumos", void 0);
