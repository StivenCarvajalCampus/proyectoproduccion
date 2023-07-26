import {jwtVerify} from "jose";
  
 const validateToken = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).send({ token: "Token no valido" });
    try {
        const encoder = new TextEncoder();
        req.data = await jwtVerify(
        authorization,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
        );
        next();
    } catch (error) {
        res.status(401).send({ token: "el token no esta funcionando, genere uno nuevo" });
    }
};

export {
    validateToken
}