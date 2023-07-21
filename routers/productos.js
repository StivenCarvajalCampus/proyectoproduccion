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
storageProductos.get("/", (req,res)=>{
    conex.query(
        `SELECT * FROM productos`,
        (err,data,fill)=>{
            res.send(JSON.stringify(data));

        }
    );

})
storageProductos.post("/",(req,res)=>{
    const {nombre_producto, descripcion, precio_venta, unidad_medida}=req.body;

    conex.query(`INSERT INTO productos (nombre_producto, descripcion, precio_venta, unidad_medida) VALUES (?,?,?,?)`,
    [nombre_producto, descripcion, precio_venta,unidad_medida],
    (err,data,fill)=>{
        if(err){
            console.log(err)
            res.status(500).send("Error al guardar el producto")
        }else{
            res.send("Producto agregado")
            }
        }
    )
})
storageProductos.put('/:id', (req,res)=>{
    const id_producto = req.params.id_producto;
    const {nombre_producto, descripcion, precio_venta, unidad_medida}=req.body;
    conex.query(`UPDATE productos SET nombre_producto=?, descripcion=?, precio_venta=?, unidad_medida=? WHERE id_producto=?;`,
    [nombre_producto, descripcion, precio_venta,unidad_medida, id_producto],
    (err,data,fill)=>{
        if(err){
            console.log(err)
            res.status(500).send("Error al actualizar el producto")
        }else{
            res.send("Producto actualizado con exito")
            }
        }

    )

})
export default storageProductos;
