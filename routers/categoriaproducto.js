import { Router, query } from "express";
import dotenv from 'dotenv';
import mysql from 'mysql2';
import proxyCategoria from "../middleware/Proxycategoria.js";

let storageCategoria = Router();
dotenv.config();
let conex = undefined;
storageCategoria.use((req,res,next)=>{
    let my_config=JSON.parse(process.env.MY_CONNECT);
    conex = mysql.createPool(my_config);
    next();
})
storageCategoria.get("/", (req,res)=>{
    conex.query(
        `SELECT * FROM categoria_producto INNER JOIN productos ON categoria_producto.id_producto = productos.id_producto`,
        (err,data,fill)=>{
            res.send(JSON.stringify(data));

        }
    );

})
storageCategoria.post("/",proxyCategoria,(req,res)=>{
    const {nombre_categoria,id_producto}=req.body;

    conex.query(`INSERT INTO categoria_producto (nombre_categoria, id_producto) VALUES (?,?)`,
    [nombre_categoria, id_producto],
    console.log(nombre_categoria),
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
storageCategoria.put('/:id_categoria', (req,res)=>{
    const id_categoria = req.params.id_categoria;
    const {nombre_categoria,id_producto}=req.body;
    console.log(nombre_categoria,id_producto,id_categoria);
    conex.query(
        /*SQL*/`UPDATE categoria_producto SET nombre_categoria=?,id_producto=? WHERE id_categoria=?;`,
    [nombre_categoria,id_producto,id_categoria],
    (error, result) => {
        if (error) {
          console.error('Error al actualizar la categoria:', error);
          res.status(500).send('Error al actualizar la categoria en la base de datos.');
        } else {
          res.status(200).send('Categoria actualizado correctamente.');
        }
      }

    )

})
storageCategoria.delete('/deletecategoria',(req,res)=>{
    const id_categoria = req.body.idDelete;
    console.log(id_categoria);
    conex.query(
        `DELETE FROM categoria_producto WHERE id_categoria = ${id_categoria};`,
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
export default storageCategoria;
