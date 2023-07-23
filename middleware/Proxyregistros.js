import express from 'express';
import 'reflect-metadata';
import {plainToClass} from 'class-transformer';
import { Registros } from './../controllerDTO/registrosproduccion.js';
import { validate } from 'class-validator';
//const proxyRegistros = express();
const proxyRegistros = async (req,res,next)=>{
    try {
    const newregistros = new Registros();
    Object.assign(newregistros, req.body);
       
    try {
        const validationErrors = await validate(newregistros);
        let data = plainToClass(Registros,req.body,{excludeExtraneousValues:true});
        req.body = data;
        next();
    } catch (error) {
        res.status(error.status).send(error);
    }

 
} catch (error) {
        
}
}
export default proxyRegistros;