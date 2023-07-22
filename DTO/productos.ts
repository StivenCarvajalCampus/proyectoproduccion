import {Expose, Type , Transform} from 'class-transformer';
import {  IsString, IsNotEmpty, Matches,IsNumber,IsDate } from 'class-validator';


export class Productos{

    @Expose({name: 'id_producto'})
    @Transform(
        ({value})=>{
            if(Math.floor(value) && typeof value === 'number') return Math.floor(value);
            else throw { status: 400, message: "El dato id_producto no cumple con los parametros establecidos"};
        },{toClassOnly: true})
    id_producto: number;

    @Expose({name : 'nombre_producto'})
    @Transform(
        ({value})=>{ if(/^[a-z A-Z0-9]+$/.test(value)) return value; else throw {status:400, message:"El parametro nombre_producto no cumple con los parametros establecidos"};
    },{toClassOnly:true})
    nombre_producto:string;

    @Expose({name : 'descripcion'})
    @Transform(
        ({value})=>{ if(/^[a-z A-Z0-9]+$/.test(value)) return value; else throw {status:400, message:"El parametro descripcion no cumple con los parametros establecidos"};
    },{toClassOnly:true})
    descripcion:string;

    @Expose({name: 'precio_venta'})
    @Transform(
        ({value})=>{
            if(Math.floor(value) && typeof value === 'number') return Math.floor(value);
            else throw { status: 400, message: "El dato precio de venta debe ser numerico"};
        },{toClassOnly: true})
    precio_venta: number;

    @Expose({name: 'unidad_medida'})
    @Transform(
        ({value})=>{
            if(Math.floor(value) && typeof value === 'number') return Math.floor(value);
            else throw { status: 400, message: "El dato unidad de medida debe ser numerico y se refiere a la cantidad del producto"};
        },{toClassOnly: true})
    unidad_medida: number;


    
    constructor(
        id_producto:number,
        nombre_producto:string,
        descripcion:string,
        precio_venta:number,
        unidad_medida:number,
    ){
        this.id_producto = id_producto;
        this.nombre_producto = nombre_producto;
        this.descripcion= descripcion;
        this.precio_venta= precio_venta;
        this.unidad_medida = unidad_medida;
    }
}