import {Expose, Type , Transform} from 'class-transformer';
import {  IsString, IsNotEmpty, Matches,IsNumber,IsDate, isNumber, isNotEmpty, validate, IsDefined } from 'class-validator';


export class Insumos{
    
    @Expose({name: 'id_insumo'})
    @IsDefined({message:()=>{throw{status:400,message:"El campo id_insumo debe ser valido"}} })
    @Transform(
        ({value})=>{
            if(Math.floor(value) && typeof value === 'number') return Math.floor(value);
            else throw { status: 400, message: "El dato id_insumo no cumple con los parametros establecidos"};
        },{toClassOnly: true})
    id_insumo: number;

    @Expose({name : 'nombre_insumo'})
    @Transform(
        ({value})=>{ if(/^[a-z A-Z0-9]+$/.test(value)) return value; else throw {status:400, message:"El parametro nombre_insumo no cumple con los parametros establecidos"};
    },{toClassOnly:true})
    nombre_insumo:string;
    
    @Expose({name: 'unidad_medida'})
    @Transform(
        ({value})=>{
            if(Math.floor(value) && typeof value === 'number') return Math.floor(value);
            else throw { status: 400, message: "El dato unidad_medida no cumple con los parametros establecidos"};
        },{toClassOnly: true})
    unidad_medida: number;

    @Expose({name: 'precio_unidad'})
    @Transform(
        ({ value })=>{if(Math.floor(value) && typeof value === 'number') return Math.floor(value);
         else throw {status:400, message:"El parametro precio unidad no cumple con las condiciones necesarias"};
    },{toClassOnly:true})
    precio_unidad:number;
    @Expose({ name: 'fecha' })
    @Type(() => Date) // Indicamos que el campo debe ser tratado como tipo Date
    @Transform(({ value }) => {
      const fecha = new Date(value);
      if (isNaN(fecha.getTime())) {
        throw {
          status: 400,
          message: "El parámetro 'fecha' no es una fecha válida.",
        };
      }
      return fecha;
    })
    @IsNotEmpty({ message: "El campo 'fecha' no puede estar vacío." })
    @IsDate({ message: "El campo 'fecha' debe ser una fecha válida." })
    public fecha: Date;
    

    @Expose({name:'proveedor'})
    @IsString()
    @IsNotEmpty({message:"el proveedor no puede estar vacio"})
    @Matches(/^[0-9]+[a-zA-Z0-9\s\-\,]*$/,{message:""})
    proveedor?:string;

    
    constructor(
        id_insumo:number,
        nombre_insumo:string,
        unidad_medida:number,
        precio_unidad:number,
        fecha?:Date,
        proveedor?:string
    ){
        this.id_insumo = id_insumo;
        this.nombre_insumo = nombre_insumo;
        this.unidad_medida= unidad_medida;
        this.precio_unidad = precio_unidad;
        this.fecha = fecha;
        this.proveedor = proveedor;
    }
}class idInsumo {
    @IsNotEmpty()
    id_insumo:number
}