import { getConnection } from "./../db/database";

/**
 * Funcion para obtener los datos de los grupos,
 * si el usuario no es el administrador, solo se envian los
 * grupos que han creado entrevistadores de su institucion
 */
const getGrupo = async (req, res) => {
    try {
        const connection = await getConnection();
        
        // El entrevistador es el administrador
        if (req.IdEntrevistador == 1) {
            const result = await connection.query("SELECT * FROM grupos");
            res.json(result);
        } else {
            // Obtener la institucion a la que pertenece el entrevistador
            const institucion = await connection.query("SELECT Institucion FROM entrevistadores WHERE IdEntrevistador = ?", req.IdEntrevistador);
            const result = await connection.query("SELECT * FROM grupos g, entrevistadorescorto e WHERE g.IdEntrevistador = e.IdEntrevistador AND e.Institucion = ?", institucion[0].Institucion);
            res.json(result);
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

/**
 * Funcion para obtener los datos de un grupo concreto
 * a partir de su Id
 */
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

/**
 * Funcion para obtener el nombre del grupo al que pertenece
 * una persona migrante
 */
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

/**
 * Funcion para obtener el Id y el nombre de los grupos
 * que han sido añadidos por un entrevistador de la misma
 * institucion 
 */
const getGrupoCorto = async (req, res) => {
    try {
        const connection = await getConnection();

        // El entrevitador es el administrado
        if (req.IdEntrevistador == 1) {
            const result = await connection.query("SELECT IdGrupo, NombreGrupo FROM grupos");
            res.json(result)
        } else {
            const institucion = await connection.query("SELECT Institucion FROM entrevistadores WHERE IdEntrevistador = ?", req.IdEntrevistador)
            const result = await connection.query("SELECT IdGrupo, NombreGrupo FROM grupos g, entrevistadorescorto e WHERE g.IdEntrevistador = e.IdEntrevistador AND e.Institucion = ?", institucion[0].Institucion);
            res.json(result);
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

/**
 * Funcion para obtener que personas pertenecen a un grupo
 * que se pasa como parametro
 */
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

/**
 * Funcion para crear un grupo de personas que migran juntas
 */
const addGrupo = async (req, res) => {
    try {
        const { NombreGrupo, FechaCreacion, NombreEncargado, LugarCreacion } = req.body;
        var IdEntrevistador = req.IdEntrevistador;

        // Comprobar que se han enviado los datos correctamente
        if (NombreGrupo === undefined || FechaCreacion === undefined || NombreEncargado === undefined || LugarCreacion === undefined) {
            res.status(400).json({ message: "Bad request" });
        }

        const grupo = {
            NombreGrupo, FechaCreacion, NombreEncargado, LugarCreacion, IdEntrevistador
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