import express from 'express';
import dotenv from 'dotenv';

import { SignJWT, jwtVerify } from 'jose';

dotenv.config();
let appExpress = express();

appExpress.use(express.json());

appExpress.get('/:id', async(req,res)=>{
    let json = {
        id: req.params.id,
        nombre: req.params.nombre
    }
    const encoder = new TextEncoder();
    const jwtconstructor = new SignJWT({json});
    const jwt = await jwtconstructor
    .setProtectedHeader({alg: "HS256", typ: "JWT"})
    .setIssuedAt()
    .setExpirationTime("3600s")
    .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
    res.send({jwt});
})
appExpress.post('/', async(req,res)=>{
    const {authorization} = req.headers;
    if (!authorization) return res.status(401).send({token: ":("});
    try{
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            authorization,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
        )
        res.send(jwtData);
    }catch(err){
        res.status(401).send({token: "Algo salio mal"})
    }
})

export default appExpress;