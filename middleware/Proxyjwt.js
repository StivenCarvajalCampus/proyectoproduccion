
import express from 'express';
import dotenv from 'dotenv';

import { SignJWT, jwtVerify } from 'jose';

dotenv.config();
let appJWT = express();

appJWT.use(express.json());

appJWT.get('/token/:id', async(req,res)=>{
    let usuario = {
        id: req.params.id,
    }
    const encoder = new TextEncoder();
    const jwtconstructor = new SignJWT({usuario});
    const jwt = await jwtconstructor
    .setProtectedHeader({alg: "HS256", typ: "JWT"})
    .setIssuedAt()
    .setExpirationTime("3600s")
    .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
    res.send({jwt});
})

appJWT.post('/', async(req,res)=>{
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
        res.status(401).send({token: "Error"+err})
    }
})

export default appJWT;