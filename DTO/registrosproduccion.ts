import {Expose, Type , Transform} from 'class-transformer';
import {  IsString, IsNotEmpty, Matches,IsNumber,IsDate } from 'class-validator';


export class Registros{

    @Expose({name: 'id_registro'})
    @Transform(
        ({value})=>{
            if(Math.floor(value) && typeof value === 'number') return Math.floor(value);
            else throw { status: 400, message: "El dato id_registro no cumple con los parametros establecidos"};
        },{toClassOnly: true})
    id_registro: number;
    
    @Expose({ name: 'fecha_produccion' })
    @Type(() => Date) // Indicamos que el campo debe ser tratado como tipo Date
    @Transform(({ value }) => {
      const fecha = new Date(value);
      if (isNaN(fecha.getTime())) {
        throw {
          status: 400,
          message: "El parámetro 'fecha_produccion' no es una fecha válida.",
        };
      }
      return fecha;
    })
    @Expose({name: 'id_producto'})
    @Transform(
        ({value})=>{
            if(Math.floor(value) && typeof value === 'number') return Math.floor(value);
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
   
    @IsNotEmpty({ message: "El campo 'fecha' no puede estar vacío." })
    @IsDate({ message: "El campo 'fecha' debe ser una fecha válida." })
    fecha: Date;

    @Expose({name: 'id_insumos'})
    @Transform(
        ({ value })=>{if(Math.floor(value) && typeof value === 'number') return Math.floor(value);
         else throw {status:400, message:"El parametro id_insumos no cumple con las condiciones necesarias"};
    },{toClassOnly:true})
    id_imsumos:number;

    
    constructor(
        id_registro:number,
        fecha:Date,
        id_producto:number,
        cantidad_producida:number,
        costo_total_producto:number,
        id_insumos:number
    ){
        this.id_registro = id_registro;
        this.fecha = fecha;
        this.id_producto= id_producto;
        this.cantidad_producida = cantidad_producida;
        this.costo_total_producto = costo_total_producto;
        this.id_imsumos = id_insumos;
    }
}