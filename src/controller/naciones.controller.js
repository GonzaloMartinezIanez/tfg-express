import { getConnection } from "./../db/database";

/**
 * Funcion que devuelve un listado con todas las nacionalidades
 */
const getNaciones = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM naciones");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

/**
 * Funcion que devuelve un listado con todos las entidades
 * de Mexico
 */
const getEntidades = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM entidades");

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

/**
 * Funcion que devuelve un listado con los municipios
 * de la entidad que se pasa como parametro
 */
const getMunicipiosId = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT IdMunicipio, municipio FROM municipios WHERE idEntidad = ?", id);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const methods = {
    getNaciones,
    getEntidades,
    getMunicipiosId
}