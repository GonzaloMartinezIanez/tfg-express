import { getConnection } from "./../db/database";
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// https://github.com/FaztWeb/angular-node-jwt

const login = async (req, res) => {
    try {
        const { User, Password } = req.body;

        if (User === undefined || Password === undefined) {
            res.status(400).json({ message: "Bad request" });
        }
        // Para crear las contraseñas
        //let PasswordHash = await bcrypt.hash(Password, 8);

        const connection = await getConnection();
        await connection.query('SELECT * FROM entrevistadores WHERE User = ?', User, async (error, results) => {
            if (results.length == 0 || !(await bcrypt.compare(Password, results[0].Password))) {
                res.status(401).json({ message: "Usuario o contraseña incorrecta" });
            } else {
                //creamos el token del usuario     
                const token = jwt.sign({ id: results[0].IdEntrevistador }, 'fif29f3uf34b');

                res.status(200).json({ token });
            }
        });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

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
    login,
    verifyToken
}