import express from 'express';
import 'reflect-metadata';
import {plainToClass} from 'class-transformer';
import { Insumos } from './../controllerDTO/insumos.js';
import { validate } from 'class-validator';
//const proxyInsumos = express();
const proxyInsumos= async(req,res,next)=>{
try {
 
    const newinsumos = new Insumos();
    Object.assign(newinsumos, req.body);
    try {
        const validationErrors = await validate(newinsumos);
        let data = plainToClass(Insumos,req.body,{excludeExtraneousValues:true});
        req.body = data;
        next();
    } catch (error) {
        res.status(error.status).send(error);
    }

   
} catch (error) {
}
}
export default proxyInsumos;