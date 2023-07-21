import dotenv from 'dotenv';
import express from 'express';
import storageProductos from './routers/productos.js';
import storageInsumos from './routers/insumos.js';
import storageInventario from './routers/inventario.js';
import storageRegistros from './routers/registrosproduccion.js';

dotenv.config();
const appExpress = express();
const config = JSON.parse(process.env.MY_CONFIG);
appExpress.use(express.json());
appExpress.use("/productos", storageProductos);
appExpress.use("/insumos", storageInsumos);
appExpress.use("/inventario",storageInventario);
appExpress.use("/registros",storageRegistros);
appExpress.listen(config, ()=>console.log(`Hola mundo, http://${config.hostname}:${config.port}`));

