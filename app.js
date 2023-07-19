import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const appExpress = express();
const config = JSON.parse(process.env.MY_CONFIG);
appExpress.use(express.json());
appExpress.listen(config, ()=>console.log(`Hola mundo, http://${config.hostname}:${config.port}`));
