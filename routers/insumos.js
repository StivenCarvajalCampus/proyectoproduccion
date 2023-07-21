import { Router, query } from "express";
import dotenv from 'dotenv';
import mysql from 'mysql2';

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
storageInsumos.post("/",(req,res)=>{
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
storageInsumos.put('/:id', (req,res)=>{
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
export default storageInsumos;
