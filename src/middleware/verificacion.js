const jwt = require('jsonwebtoken');

/**
 * Middleware para comprobar que la peticion
 * tiene un token valido 
 * @returns Error si no es correcto y continuar con la
 * ejecucion si es valido
 */
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send("Acceso denegado");
    }

    const token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send("Acceso denegado");
    }

    const payload = jwt.verify(token, 'fif29f3uf34b');
    req.IdEntrevistador = payload.id;
    next();
}

export const methods = {
    verifyToken
}