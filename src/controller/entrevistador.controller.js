import { getConnection } from "./../db/database";

/**
 * Funcion para obtener la informacion del entrevisador
 * que realiza la peticion
 */
const getEntrevistador = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT Nombre, ApellidoPaterno, ApellidoMaterno, Institucion, Cargo, LugarActual FROM entrevistadores WHERE IdEntrevistador = ?", req.IdEntrevistador);

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
/* const addEntrevistador = async (req, res) => {
    try {
        const { Nombre, ApellidoPaterno, ApellidoMaterno, Institucion, Cargo, LugarActual } = req.body;


        if (Nombre === undefined || ApellidoPaterno === undefined || ApellidoMaterno === undefined || Institucion === undefined || Cargo === undefined || LugarActual === undefined) {
            res.status(400).json({ message: "Bad request" });
        }

        const entrevistador = {
            Nombre, ApellidoPaterno, ApellidoMaterno, Institucion, Cargo, LugarActual
        }

        const connection = await getConnection();

        const result = await connection.query("INSERT INTO entrevistadores SET ?", entrevistador);
        res.json({ message: "Entrevistador añadido" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
} */

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
        const { Nombre, ApellidoPaterno, ApellidoMaterno, Institucion, Cargo, LugarActual } = req.body;

        // Comprobar que se han enviado los datos correctamente
        if (Nombre === undefined || ApellidoPaterno === undefined || ApellidoMaterno === undefined || Institucion === undefined || Cargo === undefined || LugarActual === undefined) {
            res.status(400).json({ message: "Bad request" });
        }

        const entrevistador = {
            Nombre, ApellidoPaterno, ApellidoMaterno, Institucion, Cargo, LugarActual
        }

        const connection = await getConnection();
        const result = await connection.query("UPDATE entrevistadores SET ? WHERE idEntrevistador = ?", [entrevistador, req.IdEntrevistador]);

        res.json("Entrevistador actualizado");
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const methods = {
    getEntrevistador,
    updateEntrevistador
}