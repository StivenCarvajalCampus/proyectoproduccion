import express from 'express';
import 'reflect-metadata';
import {plainToClass} from 'class-transformer';
import { Categoria } from './../controllerDTO/categoriaproducto.js';
const proxyCategoria = express();

proxyCategoria.use((req,res,next)=>{
    try {
        let data = plainToClass(Categoria,req.body,{excludeExtraneousValues:true});
        req.body = data;
        next();
    } catch (error) {
        res.status(error.status).send(error);
    }
})

export default proxyCategoria;