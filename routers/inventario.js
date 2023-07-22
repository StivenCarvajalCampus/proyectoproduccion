import { Router, query } from "express";
import dotenv from 'dotenv';
import mysql from 'mysql2';
import proxyInventarios from "../middleware/Proxyinventarios.js";

let storageInventario = Router();
dotenv.config();
let conex = undefined;
storageInventario.use((req,res,next)=>{
    let my_config=JSON.parse(process.env.MY_CONNECT);
    conex = mysql.createPool(my_config);
    next();
})
storageInventario.get("/", (req,res)=>{
    conex.query(
        `SELECT * FROM inventario INNER JOIN productos ON inventario.id_producto = productos.id_producto`,
        (err,data,fill)=>{
            res.send(JSON.stringify(data));

        }
    );

})
storageInventario.post("/",proxyInventarios,(req,res)=>{
    const {cantidad_stock,id_producto}=req.body;

    conex.query(`INSERT INTO inventario (cantidad_stock, id_producto) VALUES (?,?)`,
    [cantidad_stock, id_producto],
    (err,data,fill)=>{
        if(err){
            console.log(err)
            res.status(500).send("Error al guardar el stock")
        }else{
            res.send("Stock agregado")
            }
        }
    )
})
storageInventario.put('/:id', (req,res)=>{
    const id_inventario = req.params.id;
    const {cantidad_stock,id_producto}=req.body;
    console.log(id_inventario, cantidad_stock, id_producto);
    conex.query(
        /*SQL*/`UPDATE inventario SET cantidad_stock=?,id_producto=? WHERE id_inventario=?;`,
    [cantidad_stock,id_producto,id_inventario],
    (error, result) => {
        if (error) {
          console.error('Error al actualizar el insumo:', error);
          res.status(500).send('Error al actualizar el insumo en la base de datos.');
        } else {
          res.status(200).send('Insumo actualizado correctamente.');
        }
      }

    )

})
export default storageInventario;
