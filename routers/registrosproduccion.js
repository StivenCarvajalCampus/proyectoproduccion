import { Router, query } from "express";
import dotenv from 'dotenv';
import mysql from 'mysql2';
import proxyRegistros from "../middleware/Proxyregistros.js";
import { validateToken } from "./jwt.js";

let storageRegistros = Router();
dotenv.config();
let conex = undefined;
storageRegistros.use((req,res,next)=>{
    let my_config=JSON.parse(process.env.MY_CONNECT);
    conex = mysql.createPool(my_config);
    next();
})
storageRegistros.get("/",validateToken, (req,res)=>{
    conex.query(
        `SELECT * FROM registros_produccion INNER JOIN productos ON registros_produccion.id_producto = productos.id_producto INNER JOIN insumos ON registros_produccion.id_insumos = insumos.id_insumo`,
        (err,data,fill)=>{
            res.send(JSON.stringify(data));

        }
    );

})
storageRegistros.post("/",proxyRegistros,validateToken,(req,res)=>{
    const {fecha_produccion, id_producto, cantidad_producida, costo_total_producto, id_insumos}=req.body;

    conex.query(`INSERT INTO registros_produccion (fecha_produccion, id_producto, cantidad_producida, costo_total_producto, id_insumos) VALUES (?,?,?,?,?)`,
    [fecha_produccion, id_producto, cantidad_producida, costo_total_producto, id_insumos],
    (err,data,fill)=>{
        if(err){
            console.log(err)
            res.status(500).send("Error al guardar el registro")
        }else{
            res.send("Registro agregado")
            }
        }
    )
})
storageRegistros.put('/:id_registro',validateToken, (req,res)=>{
    const id_registro = req.params.id_registro;
    const {fecha_produccion, id_producto, cantidad_producida, costo_total_producto, id_insumos}=req.body;
    conex.query(`UPDATE registros_produccion SET fecha_produccion = ?, id_producto=?, cantidad_producida=?, costo_total_producto=?, id_insumos=? WHERE id_registro=?;`,
    [fecha_produccion, id_producto, cantidad_producida, costo_total_producto, id_insumos, id_registro],
    (error, result) => {
        if (error) {
          console.error('Error al actualizar el insumo:', error);
          res.status(500).send('Error al actualizar el registro en la base de datos.');
        } else {
          res.status(200).send('Registro actualizado correctamente.');
        }
      }

    )

})
storageRegistros.delete('/deleteregistro',validateToken,(req,res)=>{
    const id_registro = req.body.idDelete;
    conex.query(
        `DELETE FROM registros_produccion WHERE id_registro = ${id_registro};`,
        (err,data,fill)=>{
            if(err){
                const errorMessage = `Error al eliminar la data`;
                res.status(500).send(err);
            }else{
                if (data.affectedRows === 0){
                    res.status(404).send("el registro solicitado no existe");
                }else{
                    res.send("Los datos han sido eliminados con exito");
                }
            }
        }
    )
})
export default storageRegistros;
