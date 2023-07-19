import { Router } from "express";
import dotenv from 'dotenv';
import mysql from 'mysql2';

let storageProductos = Router();
dotenv.config();
let conex = undefined;
storageProductos.use((req,res,next)=>{
    let my_config=JSON.parse(process.env.MY_CONNECT);
    conex = mysql.createPool(my_config);
    next();
})