import { getConnection } from "./../db/database";

const getGrupo = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM grupos");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getGrupoId = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM grupos WHERE idGrupo = ?", id);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getGrupoInteraccionId = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT NombreGrupo from personasengrupos p, grupos g WHERE p.IdGrupo = g.IdGrupo AND p.IdInteraccion = ?", id);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getGrupoCorto = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT IdGrupo, NombreGrupo FROM grupos");

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getPersonasEnGrupo = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT Nombre, ApellidoPaterno, ApellidoMaterno FROM interacciones i, personasengrupos p WHERE i.IdInteraccion = p.IdInteraccion AND p.IdGrupo = ?", id);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const addGrupo = async (req, res) => {
    try {
        const { NombreGrupo, FechaCreacion, NombreEncargado, LugarCreacion } = req.body;

        if (NombreGrupo === undefined || FechaCreacion === undefined || NombreEncargado === undefined || LugarCreacion === undefined) {
            res.status(400).json({ message: "Bad request" });
        }

        const grupo = {
            NombreGrupo, FechaCreacion, NombreEncargado, LugarCreacion
        }

        const connection = await getConnection();
        await connection.query("INSERT INTO grupos SET ?", grupo);

        res.json({ message: "Grupo añadido" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}



export const methods = {
    getGrupo,
    getGrupoId,
    getGrupoInteraccionId,
    getGrupoCorto,
    getPersonasEnGrupo,
    addGrupo
}