import express from 'express';
import 'reflect-metadata';
import {plainToClass} from 'class-transformer';
import { Productos } from './../controllerDTO/productos.js';
const proxyProductos = express();

proxyProductos.use((req,res,next)=>{
    try {
        let data = plainToClass(Productos,req.body,{excludeExtraneousValues:true});
        req.body = data;
        next();
    } catch (error) {
        res.status(error.status).send(error);
    }
})

export default proxyProductos;