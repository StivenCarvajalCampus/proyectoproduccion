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
import { IsString, IsNotEmpty, Matches, IsDate } from 'class-validator';
export class Insumos {
    constructor(id_insumo, nombre_insumo, unidad_medida, precio_unidad, fecha, proveedor) {
        this.id_insumo = id_insumo;
        this.nombre_insumo = nombre_insumo;
        this.unidad_medida = unidad_medida;
        this.precio_unidad = precio_unidad;
        this.fecha = fecha;
        this.proveedor = proveedor;
    }
}
__decorate([
    Expose({ name: 'id_insumo' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value === 'number')
            return Math.floor(value);
        else
            throw { status: 400, message: "El dato id_insumo no cumple con los parametros establecidos" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Insumos.prototype, "id_insumo", void 0);
__decorate([
    Expose({ name: 'nombre_insumo' }),
    Transform(({ value }) => {
        if (/^[a-z A-Z0-9]+$/.test(value))
            return value;
        else
            throw { status: 400, message: "El parametro nombre_insumo no cumple con los parametros establecidos" };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], Insumos.prototype, "nombre_insumo", void 0);
__decorate([
    Expose({ name: 'unidad_medida' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value === 'number')
            return Math.floor(value);
        else
            throw { status: 400, message: "El dato unidad_medida no cumple con los parametros establecidos" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Insumos.prototype, "unidad_medida", void 0);
__decorate([
    Expose({ name: 'precio_unidad' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value === 'number')
            return Math.floor(value);
        else
            throw { status: 400, message: "El parametro precio unidad no cumple con las condiciones necesarias" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Insumos.prototype, "precio_unidad", void 0);
__decorate([
    Expose({ name: 'fecha' }),
    Type(() => Date) // Indicamos que el campo debe ser tratado como tipo Date
    ,
    Transform(({ value }) => {
        const fecha = new Date(value);
        if (isNaN(fecha.getTime())) {
            throw {
                status: 400,
                message: "El parámetro 'fecha' no es una fecha válida.",
            };
        }
        return fecha;
    }),
    IsNotEmpty({ message: "El campo 'fecha' no puede estar vacío." }),
    IsDate({ message: "El campo 'fecha' debe ser una fecha válida." }),
    __metadata("design:type", Date)
], Insumos.prototype, "fecha", void 0);
__decorate([
    Expose({ name: 'proveedor' }),
    IsString(),
    IsNotEmpty({ message: "el proveedor no puede estar vacio" }),
    Matches(/^[0-9]+[a-zA-Z0-9\s\-\,]*$/, { message: "" }),
    __metadata("design:type", String)
], Insumos.prototype, "proveedor", void 0);
