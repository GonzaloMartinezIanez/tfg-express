import { getConnection } from "./../db/database";
const bcrypt = require('bcryptjs');

/**
 * Funcion para obtener la informacion del entrevisador
 * que realiza la peticion
 */
const getEntrevistador = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT Nombre, ApellidoPaterno, ApellidoMaterno, Institucion, Cargo, User, LugarActual, LugarActualCoordenadas FROM entrevistadores WHERE IdEntrevistador = ?", req.IdEntrevistador);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

/**
 * Funcion para obtener la informacion del entrevisador
 * que realiza la peticion
 */
const getEntrevistadores = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT IdEntrevistador, Nombre, ApellidoPaterno, ApellidoMaterno, Institucion, Cargo, User, LugarActual, LugarActualCoordenadas FROM entrevistadores");

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

/**
 * Funcion para obtener la informacion del entrevisador
 * que realiza la peticion
 */
const getEntrevistadorNombre = async (req, res) => {
    try {

        const { id } = req.params;

        const connection = await getConnection();
        const result = await connection.query("SELECT Nombre, ApellidoPaterno, ApellidoMaterno FROM entrevistadores WHERE IdEntrevistador = ?", id);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

/**
 * Funcion para añadir un entrevistador al sistema
 * Faltan los campos de usuario y contraseña
 */
const addEntrevistador = async (req, res) => {
    try {
        const { Nombre, ApellidoPaterno, ApellidoMaterno, Institucion, Cargo, User, Password } = req.body;


        if (Nombre === undefined || ApellidoPaterno === undefined || ApellidoMaterno === undefined || Institucion === undefined || Cargo === undefined || User === undefined || Password === undefined) {
            res.status(400).json({ message: "Bad request" });
        }

        Password = await bcrypt.hash(Password, 8);
        const entrevistador = {
            Nombre, ApellidoPaterno, ApellidoMaterno, Institucion, Cargo, User, Password
        }

        const connection = await getConnection();

        const result = await connection.query("INSERT INTO entrevistadores SET ?", entrevistador);
        res.json({ message: "Entrevistador añadido" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

/**
 * Funcion para eliminar un entrevistador
 */
/* const deleteEntrevistador = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM entrevistadores WHERE IdEntrevistador = ?", req.IdEntrevistador);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
} */

/**
 * Funcion para actulizar los campos de un entrevistaodr
 */
const updateEntrevistador = async (req, res) => {
    try {
        const { LugarActual, LugarActualCoordenadas } = req.body;

        // Comprobar que se han enviado los datos correctamente
        if (LugarActual === undefined || LugarActualCoordenadas === undefined) {
            res.status(400).json({ message: "Bad request" });
        }

        const entrevistador = {
            LugarActual, LugarActualCoordenadas
        }

        const connection = await getConnection();
        const result = await connection.query("UPDATE entrevistadores SET ? WHERE idEntrevistador = ?", [entrevistador, req.IdEntrevistador]);

        res.json({ message: "Entrevistador actualizado" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

/**
 * Funcion para actulizar los campos de un entrevistaodr
 */
const updateEntrevistadorAdministrador = async (req, res) => {
    try {
        const { IdEntrevistador, Nombre, ApellidoPaterno, ApellidoMaterno, Institucion, Cargo, User } = req.body;

        // Comprobar que se han enviado los datos correctamente
        if (IdEntrevistador === undefined || Nombre === undefined || ApellidoPaterno === undefined || ApellidoMaterno === undefined || Institucion === undefined || Cargo === undefined || User === undefined) {
            res.status(400).json({ message: "Bad request" });
        }

        const entrevistador = {
            Nombre, ApellidoPaterno, ApellidoMaterno, Institucion, Cargo, User
        }

        const connection = await getConnection();
        const result = await connection.query("UPDATE entrevistadores SET ? WHERE idEntrevistador = ?", [entrevistador, IdEntrevistador]);

        res.json({ message: "Entrevistador actualizado" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

/**
 * Funcion para crear un nuevo entrevistador
 */
const registrar = async (req, res) => {
    try {
        const { Nombre, ApellidoPaterno, ApellidoMaterno, Institucion, Cargo, User, Password2 } = req.body;

        // Comprobar que se han enviado los datos correctamente
        if (Nombre === undefined || ApellidoPaterno === undefined || ApellidoMaterno === undefined || Institucion === undefined || Cargo === undefined || User === undefined || Password2 === undefined) {
            res.status(400).json({ message: "Bad request" });
        }

        var Password = await bcrypt.hash(Password2, 8);

        const entrevistador = {
            Nombre, ApellidoPaterno, ApellidoMaterno, Institucion, Cargo, User, Password
        }


        const connection = await getConnection();
        const result = await connection.query("INSERT INTO entrevistadores SET ?", entrevistador);

        res.json({ message: "Entrevistador añadido" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

/**
 * Funcion para cambiar la contraseña de un entrevistaodr
 */
const changePassword = async (req, res) => {
    try {
        const { OldPassword, NewPassword } = req.body;
        // Comprobar que se han enviado los datos correctamente
        if (OldPassword === undefined || NewPassword === undefined) {
            res.status(400).json({ message: "Bad request" });
        }

        const connection = await getConnection();
        const resultado = await connection.query('SELECT Password FROM entrevistadores WHERE IdEntrevistador = ?', req.IdEntrevistador, async (error, results) => {
            // Comprobar que se ha introducido la contraseña correcta
            if (results.length == 0 || !(await bcrypt.compare(OldPassword, results[0].Password))) {
                res.status(200).json({ message: "Contraseña distinta" });
            } else {
                let Password = await bcrypt.hash(NewPassword, 8);
                await connection.query('UPDATE entrevistadores set Password = ? WHERE IdEntrevistador = ?', [Password, req.IdEntrevistador])
                res.status(200).json({ message: "Contraseña actualizada" });
            }
        });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

/**
 * Funcion para cambiar la contraseña de un entrevistador
 */
const changePasswordAdmin = async (req, res) => {
    try {
        const { IdEntrevistador, Password2 } = req.body;
        // Comprobar que se han enviado los datos correctamente
        if (IdEntrevistador === undefined || Password2 === undefined) {
            res.status(400).json({ message: "Bad request" });
        }

        let Password = await bcrypt.hash(Password2, 8);

        const connection = await getConnection();
        const result = await connection.query('UPDATE entrevistadores set Password = ? WHERE IdEntrevistador = ?', [Password, IdEntrevistador])

        res.json({ message: "Contraseña actualizada" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const methods = {
    getEntrevistador,
    getEntrevistadores,
    getEntrevistadorNombre,
    updateEntrevistador,
    updateEntrevistadorAdministrador,
    registrar,
    changePassword,
    changePasswordAdmin
}