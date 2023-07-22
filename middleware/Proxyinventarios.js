import express from 'express';
import 'reflect-metadata';
import {plainToClass} from 'class-transformer';
import { Inventario } from './../controllerDTO/inventario.js';
const proxyInventarios = express();

proxyInventarios.use((req,res,next)=>{
    try {
        let data = plainToClass(Inventario,req.body,{excludeExtraneousValues:true});
        req.body = data;
        next();
    } catch (error) {
        res.status(error.status).send(error);
    }
})

export default proxyInventarios;