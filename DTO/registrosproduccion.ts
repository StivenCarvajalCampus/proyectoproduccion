import {Expose, Type , Transform} from 'class-transformer';
import {  IsNotEmpty, IsDate,IsDefined } from 'class-validator';


export class Registros{
    @Expose({name: "id_registro"})
    @Type(() => Number)
    reg: number
    
    @Expose({ name: 'fecha_produccion' })
    @Type(() => String) // Indicamos que el campo debe ser tratado como tipo Date
    @Transform(({ value }) => {
      if (/^\d{4}\/(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])$/.test(value)) {
        throw {
          status: 400,
          message: "El parámetro 'fecha_produccion' no es una fecha válida.",
        };
      }
      return value;
    })
    fch_pr: string 

    @Expose({name: 'id_producto'})
    @IsDefined({message:()=>{throw{status:400,message:"El campo id_producto es obligatorio"}} })
    @Transform(
        ({value})=>{
            if(Math.floor(value) ) return Math.floor(value);
            else throw { status: 400, message: "El dato id_producto no cumple con los parametros establecidos"};
        },{toClassOnly: true})
    id_producto: number;
    
    @Expose({name: 'cantidad_producida'})
    @Transform(
        ({value})=>{
            if(Math.floor(value) && typeof value === 'number') return Math.floor(value);
            else throw { status: 400, message: "El dato cantidad_producida no cumple con los parametros establecidos"};
        },{toClassOnly: true})
    cantidad_producida: number;

    @Expose({name: 'costo_total_producto'})
    @Transform(
        ({ value })=>{if(Math.floor(value) && typeof value === 'number') return Math.floor(value);
         else throw {status:400, message:"El parametro costo producto no cumple con las condiciones necesarias"};
    },{toClassOnly:true})
    costo_total_producto:number;


    @Expose({name: 'id_insumos'})
    @Transform(
        ({ value })=>{if(Math.floor(value) && typeof value === 'number') return Math.floor(value);
         else throw {status:400, message:"El parametro id_insumos no cumple con las condiciones necesarias"};
    },{toClassOnly:true})
    id_imsumos:number;

    
    constructor(
        reg: number,
        fecha: string,
        id_producto:number,
        cantidad_producida:number,
        costo_total_producto:number,
        id_insumos:number
    ){
        this.reg = reg
        this.fch_pr = fecha
        this.id_producto= id_producto;
        this.cantidad_producida = cantidad_producida;
        this.costo_total_producto = costo_total_producto;
        this.id_imsumos = id_insumos;
    }
}