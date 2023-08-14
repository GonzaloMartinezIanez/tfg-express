const jwt = require('jsonwebtoken');
import { getConnection } from "./../db/database";

/**
 * Middleware para comprobar que la peticion
 * tiene un token valido 
 * @returns Error si no es correcto y continuar con la
 * ejecucion si es valido
 */
const verifyToken = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send("Acceso denegado");
        }

        const token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
            return res.status(401).send("Acceso denegado");
        }

        const payload = jwt.verify(token, 'fif29f3uf34b');
        req.IdEntrevistador = payload.id;


        const connection = await getConnection();
        const cargo = await connection.query("SELECT Cargo FROM entrevistadores WHERE IdEntrevistador = ?", payload.id);
        req.cargo = cargo[0].Cargo;

        next();
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }


}

/**
 * Middleware para comprobar que la peticion
 * tiene un token valido de administrador
 * @returns Error si no es correcto y continuar con la
 * ejecucion si es valido
 */
const verifyTokenAdmin = async (req, res, next) => {
    try {
        // No se ha enviado un token en el header
        if (!req.headers.authorization) {
            return res.status(401).send("Acceso denegado");
        }

        const token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
            return res.status(401).send("Acceso denegado");
        }

        const payload = jwt.verify(token, 'fif29f3uf34b');
        
        const connection = await getConnection();
        const cargo = await connection.query("SELECT Cargo FROM entrevistadores WHERE IdEntrevistador = ?", payload.id);

        if(cargo[0].Cargo != "ADMINISTRADOR"){
            return res.status(401).send("Acceso denegado");
        } else{
            req.IdEntrevistador = payload.id;
            req.cargo = cargo[0].Cargo;

            next();
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

}



export const methods = {
    verifyToken,
    verifyTokenAdmin
}