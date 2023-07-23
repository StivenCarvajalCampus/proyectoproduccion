import express from 'express';
import 'reflect-metadata';
import {plainToClass} from 'class-transformer';
import { Registros } from './../controllerDTO/registrosproduccion.js';
const proxyRegistros = express();

proxyRegistros.use((req,res,next)=>{
    try {
        let data = plainToClass(Registros,req.body,{excludeExtraneousValues:true});
        req.body = data;
        next();
    } catch (error) {
        res.status(error.status).send(error);
    }
})

export default proxyRegistros;