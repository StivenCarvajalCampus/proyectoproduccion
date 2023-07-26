import { Router, query } from "express";
import dotenv from 'dotenv';
import mysql from 'mysql2';
import proxyInventarios from "../middleware/Proxyinventarios.js";
import { validateToken } from "./jwt.js";

let storageInventario = Router();
dotenv.config();
let conex = undefined;
storageInventario.use((req,res,next)=>{
    let my_config=JSON.parse(process.env.MY_CONNECT);
    conex = mysql.createPool(my_config);
    next();
})
storageInventario.get("/",validateToken,  (req,res)=>{
    conex.query(
        `SELECT * FROM inventario INNER JOIN productos ON inventario.id_producto = productos.id_producto`,
        (err,data,fill)=>{
            res.send(JSON.stringify(data));

        }
    );

})
storageInventario.post("/",proxyInventarios,validateToken,(req,res)=>{
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
storageInventario.put('/:id_inventario',validateToken, (req,res)=>{
    const id_inventario = req.params.id_inventario;
    const {cantidad_stock,id_producto}=req.body;
    console.log(id_inventario, cantidad_stock, id_producto);
    conex.query(
        /*SQL*/`UPDATE inventario SET cantidad_stock=?,id_producto=? WHERE id_inventario=?;`,
    [cantidad_stock,id_producto,id_inventario],
    (error, result) => {
        if (error) {
          console.error('Error al actualizar el inventario:', error);
          res.status(500).send('Error al actualizar el inventario en la base de datos.');
        } else {
          res.status(200).send('Inventario actualizado correctamente.');
        }
      }

    )

})


storageInventario.delete('/deleteinventario',validateToken,(req,res)=>{
    const id_inventario = req.body.idDelete;
    console.log(id_inventario);
    conex.query(
        `DELETE FROM inventario WHERE id_inventario = ${id_inventario};`,
        (err,data,fill)=>{
            if(err){
                const errorMessage = `Error al eliminar la data`;
                res.status(500).send(err);
            }else{
                if (data.affectedRows === 0){
                    res.status(404).send("el inventario solicitado no existe");
                }else{
                    res.send("Los datos han sido eliminados con exito");
                }
            }
        }
    )
})
export default storageInventario;
