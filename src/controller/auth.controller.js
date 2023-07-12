import { getConnection } from "./../db/database";
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Funcion que recibe un usuario y contraseña y
 * comprueba que es un usuario valido
 * @returns Error si el usuario no existe o tiene el usuario
 * o contraseña incorrectos. Si es valido, se envia el token con 
 * el id del entrevistador
 */
const login = async (req, res) => {
    try {
        const { User, Password } = req.body;

        // Comprobar que se han enviado los datos correctamente
        if (User === undefined || Password === undefined) {
            res.status(400).json({ message: "Bad request" });
        }

        // Para crear las contraseñas
        //let PasswordHash = await bcrypt.hash(Password, 8);

        const connection = await getConnection();
        await connection.query('SELECT * FROM entrevistadores WHERE User = ?', User, async (error, results) => {
            // Comprobar que existen un entrevistador con ese usuario y verificar que la contraseña
            // es la misma
            if (results.length == 0 || !(await bcrypt.compare(Password, results[0].Password))) {
                res.status(401).json({ message: "Usuario o contraseña incorrecta" });
            } else {
                // Crear el token del usuario
                const token = jwt.sign({ id: results[0].IdEntrevistador }, 'fif29f3uf34b');

                res.status(200).json({ token });
            }
        });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const methods = {
    login
}