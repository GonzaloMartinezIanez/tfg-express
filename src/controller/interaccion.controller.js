import { getConnection } from "./../db/database";
const fs = require('fs');
const path = require('path');

/**
 * Funcion para obtener todas las interaciones registradas 
 * por un entrevistador de la misma institucion
 */
const getInteraccion = async (req, res) => {
    try {
        const connection = await getConnection();

        // El entrevistador es el administrador
        if (req.IdEntrevistador == 1) {
            const result = await connection.query("SELECT * FROM interacciones");

            res.json(result);
        } else {
            // Obtener la institucion del entrevistador
            const institucion = await connection.query("SELECT Institucion FROM entrevistadores WHERE IdEntrevistador = ?", req.IdEntrevistador)
            const result = await connection.query("SELECT * FROM interacciones i, entrevistadorescorto e WHERE i.IdEntrevistador = e.IdEntrevistador AND e.Institucion = ?", institucion[0].Institucion);
            res.json(result);
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

/**
 * Funcion para obtener una interaccion a traves de su folio
 */
const getInteraccionId = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        if (req.IdEntrevistador == 1) {
            const result = await connection.query("SELECT * FROM interacciones WHERE IdInteraccion = ?", id);
            //const pathImagen = path.join(__dirname, "./../../", result[0].Imagen);

            /* if (result[0].Imagen != "") {
                fs.exists(pathImagen, (exists) => {
                    console.log(pathImagen)
                    if (exists) {
                        res.sendFile(pathImagen);

                        //res.json(result);    
                        //res.send()
                    } else {
                        res.json(result);
                    }
                });
            } else {
                res.json(result);
            } */
            res.json(result);
        } else {
            // Obtener la institucion del entrevistador
            const institucion = await connection.query("SELECT Institucion FROM entrevistadores WHERE IdEntrevistador = ?", req.IdEntrevistador)
            const result = await connection.query("SELECT * FROM interacciones i, entrevistadorescorto e WHERE i.IdEntrevistador = e.IdEntrevistador AND e.Institucion = ? AND i.IdInteraccion = ?", [institucion[0].Institucion, id]);

            res.json(result);
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

/**
 * Funcion para buscar entre los registro de interacciones
 * aquellas que cumplan con una condicion
 */
const getInteraccionPorCampo = async (req, res) => {
    try {
        const { campo, valor } = req.params;

        // Comprobar que se han enviado los datos correctamente
        if (campo === undefined || valor === undefined) {
            res.status(400).json({ message: "Bad request" });
        }

        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM interacciones WHERE " + campo + " = '" + valor + "'");

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

/**
 * Funcion para añadir una nueva interaccion al sistema
 */
const addInteraccion = async (req, res) => {
    try {
        const { Nombre, ApellidoPaterno, ApellidoMaterno, NombreSocial, FechaNacimiento, Sexo, Nacionalidad, Estado, Municipio, LugarFrecuenta, LugarActual, SituacionCalle, MigrantesMexicanas, TrabajadorCampo, DesplazadasForzadasInternas, MigrantesExtranjeras, Deportadas, TrabajadorHogar, DescripcionFisica, Necesidades, MensajeFamiliares, SaludFisica, SaludMental, Observaciones, Interacciones, IdGrupo } = req.body;
        const imangenFile = req.file;
        var Imagen = "";

        var IdEntrevistador = req.IdEntrevistador;

        if (imangenFile != undefined) {
            Imagen = req.file.path;
        }

        // Comprobar que se han enviado los datos correctamente
        if (Nombre === undefined || ApellidoPaterno === undefined || ApellidoMaterno === undefined || NombreSocial === undefined || FechaNacimiento === undefined || Sexo === undefined || Nacionalidad === undefined || Estado === undefined || Municipio === undefined || LugarFrecuenta === undefined || LugarActual === undefined || SituacionCalle === undefined || MigrantesMexicanas === undefined || TrabajadorCampo === undefined || DesplazadasForzadasInternas === undefined || MigrantesExtranjeras === undefined || Deportadas === undefined || TrabajadorHogar === undefined || DescripcionFisica === undefined || Necesidades === undefined || MensajeFamiliares === undefined || Necesidades === undefined || SaludFisica === undefined || SaludMental === undefined || Observaciones === undefined || Interacciones === undefined || IdGrupo === undefined) {
            res.status(400).json({ message: "Bad request" });
        }

        const interaccion = {
            Nombre, ApellidoPaterno, ApellidoMaterno, NombreSocial, FechaNacimiento, Sexo, Nacionalidad, Estado, Municipio, LugarFrecuenta, LugarActual, SituacionCalle, MigrantesMexicanas, TrabajadorCampo, DesplazadasForzadasInternas, MigrantesExtranjeras, Deportadas, TrabajadorHogar, DescripcionFisica, Necesidades, MensajeFamiliares, Imagen, SaludFisica, SaludMental, Observaciones, Interacciones, IdEntrevistador
        }

        const connection = await getConnection();
        const result = await connection.query("INSERT INTO interacciones SET ?", interaccion);

        // La persona pertenece a un grupo
        if (IdGrupo != "Sin grupo") {
            // Añadir la interaccion al grupo que pertenece
            const resultGrupos = await connection.query("INSERT INTO personasengrupos (IdGrupo, IdInteraccion) VALUES (" + IdGrupo + ", " + result.insertId + ")");
        }

        res.json({ message: "Interacción añadida", folio: result.insertId });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

/**
 * Funcion para eliminar un interaccion
 */
/* const deleteInteraccionId = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM interacciones WHERE IdInteraccion = ?", id);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
} */

/**
 * Funcion para alterar la interacion de una persona por medio
 * de su folio
 */
const updateInteraccion = async (req, res) => {
    try {
        const { IdInteraccion, Interacciones } = req.body;

        // Comprobar que se han enviado los datos correctamente
        if (IdInteraccion === undefined || Interacciones === undefined) {
            res.status(400).json({ message: "Bad request" });
        }

        const connection = await getConnection();
        const result = await connection.query("UPDATE interacciones SET Interacciones = ? WHERE IdInteraccion = ?", [Interacciones, IdInteraccion]);

        res.json({ message: "Interaccion actualizada"});
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}


export const methods = {
    getInteraccion,
    getInteraccionId,
    getInteraccionPorCampo,
    addInteraccion,
    updateInteraccion,
}