import { getConnection } from "./../db/database";

const getEntrevistador = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM entrevistadores");


        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getEntrevistadorId = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM entrevistadores WHERE idEntrevistador = ?", id);


        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const addEntrevistador = async (req, res) => {
    try {
        const { Nombre, ApellidoPaterno, ApellidoMaterno, Institucion, LugarActual } = req.body;


        if (Nombre === undefined || ApellidoPaterno === undefined || ApellidoMaterno === undefined || Institucion === undefined || LugarActual === undefined) {
            res.status(400).json({ message: "Bad request" });
        }

        const entrevistador = {
            Nombre, ApellidoPaterno, ApellidoMaterno, Institucion, LugarActual
        }

        const connection = await getConnection();

        const result = await connection.query("INSERT INTO entrevistadores SET ?", entrevistador);
        res.json({ message: "Entrevistador añadido" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const deleteEntrevistadorId = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM entrevistadores WHERE idEntrevistador = ?", id);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const updateEntrevistadorId = async (req, res) => {
    try {
        const { id } = req.params;
        const { Nombre, ApellidoPaterno, ApellidoMaterno, Institucion, LugarActual } = req.body;

        if (id === undefined || Nombre === undefined || ApellidoPaterno === undefined || ApellidoMaterno === undefined || Institucion === undefined || LugarActual === undefined) {
            res.status(400).json({ message: "Bad request" });
        }

        const entrevistador = {
            Nombre, ApellidoPaterno, ApellidoMaterno, Institucion, LugarActual
        }

        const connection = await getConnection();

        const result = await connection.query("UPDATE entrevistadores SET ? WHERE idEntrevistador = ?", [entrevistador, id]);

        res.json("Entrevistador actualizado");
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const methods = {
    getEntrevistador,
    getEntrevistadorId,
    addEntrevistador,
    deleteEntrevistadorId,
    updateEntrevistadorId
}