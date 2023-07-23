import {Expose, Type , Transform} from 'class-transformer';
import {  IsString, IsNotEmpty, Matches,IsNumber,IsDate } from 'class-validator';


export class Categoria{

    @Expose({name: 'id_categoria'})
    @Transform(
        ({value})=>{
            if(Math.floor(value) && typeof value === 'number') return Math.floor(value);
            else throw { status: 400, message: "El dato id_categoria no cumple con los parametros establecidos debe ser numerico"};
        },{toClassOnly: true})
    id_categoria: number;

    @Expose({name : 'nombre_categoria'})
    @Transform(
        ({value})=>{ if(/^[a-z A-Z0-9]+$/.test(value)) return value; else throw {status:400, message:"El parametro nombre_categoria no cumple con los parametros establecidos"};
    },{toClassOnly:true})
    nombre_categoria:string;


    @Expose({name: 'id_producto'})
    @Transform(
        ({value})=>{
            if(Math.floor(value) && typeof value === 'number') return Math.floor(value);
            else throw { status: 400, message: "El dato id_producto debe ser numerico"};
        },{toClassOnly: true})
    id_producto: number;


    
    constructor(
        id_categoria:number,
        nombre_categoria:string,
        id_producto:number,
    ){
        this.id_categoria = id_categoria;
        this.nombre_categoria = nombre_categoria;
        this.id_producto= id_producto;
    }
}