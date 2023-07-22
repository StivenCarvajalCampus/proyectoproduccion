import { Router, query } from "express";
import dotenv from 'dotenv';
import mysql from 'mysql2';
import proxyInsumos from "../middleware/Proxyinsumos.js";

let storageInsumos = Router();
dotenv.config();
let conex = undefined;
storageInsumos.use((req,res,next)=>{
    let my_config=JSON.parse(process.env.MY_CONNECT);
    conex = mysql.createPool(my_config);
    next();
})
storageInsumos.get("/", (req,res)=>{
    conex.query(
        `SELECT * FROM insumos`,
        (err,data,fill)=>{
            res.send(JSON.stringify(data));

        }
    );

})
storageInsumos.post("/",proxyInsumos,(req,res)=>{
    const {nombre_insumo, unidad_medida, precio_unidad, fecha, proveedor}=req.body;

    conex.query(`INSERT INTO insumos (nombre_insumo, unidad_medida, precio_unidad, fecha, proveedor) VALUES (?,?,?,?,?)`,
    [nombre_insumo, unidad_medida, precio_unidad, fecha, proveedor],
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
storageInsumos.put('/:id_insumo', (req,res)=>{
    const id_insumo = req.params.id_insumo;
    const {nombre_insumo, unidad_medida, precio_unidad, fecha, proveedor}=req.body;
    conex.query(`UPDATE insumos SET nombre_insumo=?, unidad_medida=?, precio_unidad=?, fecha=?, proveedor=? WHERE id_insumo=?;`,
    [nombre_insumo, unidad_medida, precio_unidad, fecha, proveedor,id_insumo],
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
storageInsumos.delete('/deleteinsumo',(req,res)=>{
    const id_insumo = req.body.idDelete;
    console.log(id_insumo);
    conex.query(
        `DELETE FROM insumos WHERE id_insumo = ${id_insumo};`,
        (err,data,fill)=>{
            if(err){
                const errorMessage = `Error al eliminar la data`;
                res.status(500).send(err);
            }else{
                if (data.affectedRows === 0){
                    res.status(404).send("el insumo solicitado no existe");
                }else{
                    res.send("Los datos han sido eliminados con exito");
                }
            }
        }
    )
})
export default storageInsumos;
