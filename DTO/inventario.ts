import {Expose, Type , Transform} from 'class-transformer';
import {  IsString, IsNotEmpty, Matches,IsNumber,IsDate } from 'class-validator';


export class Inventario{

    @Expose({name: 'id_inventario'})
    @Transform(
        ({value})=>{
            if(Math.floor(value) && typeof value === 'number') return Math.floor(value);
            else throw { status: 400, message: "El dato id_inventario no cumple con los parametros establecidos"};
        },{toClassOnly: true})
    id_inventario: number;

    @Expose({name: 'cantidad_stock'})
    @Transform(
        ({value})=>{
            if(Math.floor(value) && typeof value === 'number') return Math.floor(value);
            else throw { status: 400, message: "El dato cantidad de stock debe ser numerico"};
        },{toClassOnly: true})
    cantidad_stock: number;

    @Expose({name: 'id_producto'})
    @Transform(
        ({value})=>{
            if(Math.floor(value) && typeof value === 'number') return Math.floor(value);
            else throw { status: 400, message: "El dato cantidad de stock debe ser numerico"};
        },{toClassOnly: true})
    id_producto: number;


    
    constructor(
        id_inventario:number,
        cantidad_stock:number,
        id_producto:number,
    ){
        this.id_inventario = id_inventario;
        this.cantidad_stock = cantidad_stock;
        this.id_producto= id_producto;
    }
}