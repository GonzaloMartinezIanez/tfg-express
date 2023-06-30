import { getConnection } from "./../db/database";

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

const getEntidadesId = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT entidad FROM entidades WHERE idEntidad = ?", id);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

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
    getEntidadesId,
    getMunicipiosId
}