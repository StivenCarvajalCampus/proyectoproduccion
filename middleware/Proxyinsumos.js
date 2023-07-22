import express from 'express';
import 'reflect-metadata';
import {plainToClass} from 'class-transformer';
import { Insumos } from './../controllerDTO/insumos.js';
const proxyInsumos = express();

proxyInsumos.use((req,res,next)=>{
    try {
        let data = plainToClass(Insumos,req.body,{excludeExtraneousValues:true});
        req.body = data;
        next();
    } catch (error) {
        res.status(error.status).send(error);
    }
})

export default proxyInsumos;