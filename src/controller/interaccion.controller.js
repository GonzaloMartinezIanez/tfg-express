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
        if (req.cargo == "ADMINISTRADOR") {
            const result = await connection.query("SELECT * FROM interacciones");

            /* result.map(r =>
                r.FechaNacimiento = r.FechaNacimiento.split("-").reverse().join("-")
            ) */

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
const getInteraccionCortoId = async (req, res) => {
    try {
        const { id } = req.params;

        if (id === undefined) {
            res.status(400).json({ message: "Bad request" });
        }

        const connection = await getConnection();
        const result = await connection.query("SELECT Nombre, ApellidoPaterno, ApellidoMaterno, FechaNacimiento, Imagen, Interacciones FROM interacciones WHERE IdInteraccion = ?", id);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

/**
 * Funcion para obtener una interaccion a traves de su folio
 */
const getInteraccionPorNombre = async (req, res) => {
    try {
        const { Nombre, ApellidoPaterno, ApellidoMaterno } = req.params;

        if (Nombre === undefined || ApellidoPaterno === undefined || ApellidoMaterno === undefined) {
            res.status(400).json({ message: "Bad request" });
        }

        var sql = "SELECT IdInteraccion, Nombre, ApellidoPaterno, ApellidoMaterno FROM interacciones WHERE";
        var sqlNombre = " Nombre LIKE '%" + Nombre + "%'"
        var sqlApellidoPaterno = " ApellidoPaterno LIKE '%" + ApellidoPaterno + "%'";
        var sqlApellidoMaterno = " ApellidoMaterno LIKE '%" + ApellidoMaterno + "%'";

        var hayNombre = false;
        var hayApellidoPaterno = false;
        var hayApellidoMaterno = false;

        if (Nombre != "*") {
            hayNombre = true;
            sql = sql + sqlNombre;
        }

        if (ApellidoPaterno != "*") {
            hayApellidoPaterno = true;
            if (hayNombre) {
                sql = sql + " AND " + sqlApellidoPaterno;
            } else {
                sql = sql + sqlApellidoPaterno;
            }
        }

        if (ApellidoMaterno != "*") {
            hayApellidoMaterno = true;
            if (hayNombre || hayApellidoPaterno) {
                sql = sql + " AND " + sqlApellidoMaterno;
            } else {
                sql = sql + sqlApellidoMaterno;
            }
        }

        if (hayNombre || hayApellidoPaterno || hayApellidoMaterno) {
            const connection = await getConnection();
            const result = await connection.query(sql);
            res.json(result);
        } else {
            const connection = await getConnection();
            const result = await connection.query("SELECT IdInteraccion, Nombre, ApellidoPaterno, ApellidoMaterno FROM interacciones WHERE Nombre LIKE '%" + Nombre + "%' AND ApellidoPaterno LIKE '%" + ApellidoPaterno + "%' AND ApellidoMaterno LIKE '%" + ApellidoMaterno + "%';");
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
        const tipoCampo = req.body.tipoCampo;

        // Comprobar que se han enviado los datos correctamente
        if (tipoCampo === undefined) {
            res.status(400).json({ message: "Bad request" });
        }

        switch (tipoCampo) {
            case "texto": {
                const { campo, valor } = req.body;
                const connection = await getConnection();
                const result = await connection.query("SELECT * FROM interacciones WHERE " + campo + " LIKE '%" + valor + "%'");
                res.json(result);
            } break;
            case "textoConcreto": {
                const { campo, valor } = req.body;
                const connection = await getConnection();
                const result = await connection.query("SELECT * FROM interacciones WHERE " + campo + " = '" + valor + "'");
                res.json(result);
            } break;
            case "fecha": {
                const { campo, valorFechaInicio, valorFechaFin } = req.body;
                const connection = await getConnection();
                const result = await connection.query("SELECT * FROM interacciones WHERE " + campo + " BETWEEN '" + valorFechaInicio + "' AND '" + valorFechaFin + "'");
                res.json(result);
            } break;
            default: res.status(400).json({ message: "Bad request" }); break;
        }
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
        const { Nombre, ApellidoPaterno, ApellidoMaterno, NombreSocial, FechaNacimiento, Edad, Sexo, ViajaConIdentificacion, ViajaConIdentificacionCual, OtrosIdiomas, OtrosIdiomasCual, PuebloOriginario, PuebloOriginarioCual, Profesion, Nacionalidad, Estado, Municipio, LugarFrecuenta, EdadMigracion, AnioComienzoMigracion, MotivoMigracion, LugarActual, LugarActualCoordenadas, Interacciones, IdGrupo, Estatura, Peso, Lentes, VelloFacial, VelloFacialCual, SenialesParticulares, Lesiones, EstadoSalud, DescripcionPrendas, SituacionCalle, MigrantesMexicanas, TrabajadorCampo, DesplazadasForzadasInternas, MigrantesExtranjeras, Deportadas, TrabajadorHogar, Necesidades, Telefono, MensajeFamiliares, NombreQuienBusca, ApellidoPaternoQuienBusca, ApellidoMaternoQuienBusca, ParentescoQuienBusca, DireccionQuienBusca, TelefonoQuienBusca, CorreoElectronicoQuienBusca, OtroContactoQuienBusca, SaludFisica, SaludMental, Observaciones, FechaEntrevista } = req.body;
        const imangenFile = req.file;
        var Imagen = "";

        var IdEntrevistador = req.IdEntrevistador;

        const connection = await getConnection();
        const existe = await connection.query("SELECT IdInteraccion FROM interacciones WHERE Nombre = '" + Nombre + "' AND ApellidoPaterno = '" + ApellidoPaterno + "' AND ApellidoMaterno = '" + ApellidoMaterno + "' AND FechaNacimiento = '" + FechaNacimiento + "';");

        if (existe.length != 0) {
            res.json({ message: "La interaccion existe", folio: existe[0].IdInteraccion });
        } else {
            if (imangenFile != undefined) {
                Imagen = req.file.path.split("uploads\\")[1];
            }

            // Comprobar que se han enviado los datos correctamente
            if (Nombre === undefined || ApellidoPaterno === undefined || ApellidoMaterno === undefined || NombreSocial === undefined || FechaNacimiento === undefined || Edad === undefined || Sexo === undefined || ViajaConIdentificacion === undefined || ViajaConIdentificacionCual === undefined || OtrosIdiomas === undefined || OtrosIdiomasCual === undefined || PuebloOriginario === undefined || PuebloOriginarioCual === undefined || Profesion === undefined || Nacionalidad === undefined || Estado === undefined || Municipio === undefined || LugarFrecuenta === undefined || EdadMigracion === undefined || AnioComienzoMigracion === undefined || MotivoMigracion === undefined || LugarActual === undefined || LugarActualCoordenadas === undefined || Interacciones === undefined || IdGrupo === undefined || Estatura === undefined || Peso === undefined || Lentes === undefined || VelloFacial === undefined || VelloFacialCual === undefined || SenialesParticulares === undefined || Lesiones === undefined || EstadoSalud === undefined || DescripcionPrendas === undefined || SituacionCalle === undefined || MigrantesMexicanas === undefined || TrabajadorCampo === undefined || DesplazadasForzadasInternas === undefined || MigrantesExtranjeras === undefined || Deportadas === undefined || TrabajadorHogar === undefined || Necesidades === undefined || Telefono === undefined || MensajeFamiliares === undefined || Necesidades === undefined || NombreQuienBusca === undefined || ApellidoPaternoQuienBusca === undefined || ApellidoMaternoQuienBusca === undefined || ParentescoQuienBusca === undefined || DireccionQuienBusca === undefined || TelefonoQuienBusca === undefined || CorreoElectronicoQuienBusca === undefined || OtroContactoQuienBusca === undefined || SaludFisica === undefined || SaludMental === undefined || Observaciones === undefined || FechaEntrevista === undefined) {
                res.status(400).json({ message: "Bad request" });
            }

            const interaccion = {
                Nombre, ApellidoPaterno, ApellidoMaterno, NombreSocial, FechaNacimiento, Edad, Sexo, ViajaConIdentificacion, ViajaConIdentificacionCual, OtrosIdiomas, OtrosIdiomasCual, PuebloOriginario, PuebloOriginarioCual, Profesion, Nacionalidad, Estado, Municipio, LugarFrecuenta, EdadMigracion, AnioComienzoMigracion, MotivoMigracion, LugarActual, LugarActualCoordenadas, Interacciones, Estatura, Peso, Lentes, VelloFacial, VelloFacialCual, SenialesParticulares, Lesiones, EstadoSalud, DescripcionPrendas, Imagen, SituacionCalle, MigrantesMexicanas, TrabajadorCampo, DesplazadasForzadasInternas, MigrantesExtranjeras, Deportadas, TrabajadorHogar, Necesidades, Telefono, MensajeFamiliares, NombreQuienBusca, ApellidoPaternoQuienBusca, ApellidoMaternoQuienBusca, ParentescoQuienBusca, DireccionQuienBusca, TelefonoQuienBusca, CorreoElectronicoQuienBusca, OtroContactoQuienBusca, SaludFisica, SaludMental, Observaciones, FechaEntrevista, IdEntrevistador
            }


            const result = await connection.query("INSERT INTO interacciones SET ?", interaccion);

            // La persona pertenece a un grupo
            if (IdGrupo != "Sin grupo") {
                // Añadir la interaccion al grupo que pertenece
                const resultGrupos = await connection.query("INSERT INTO personasengrupos (IdGrupo, IdInteraccion) VALUES (" + IdGrupo + ", " + result.insertId + ")");
            }

            res.json({ message: "Interacción añadida", folio: result.insertId });
        }
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
        console.log(req.body)

        // Comprobar que se han enviado los datos correctamente
        if (IdInteraccion === undefined || Interacciones === undefined) {
            res.status(400).json({ message: "Bad request" });
        }

        const connection = await getConnection();
        const result = await connection.query("UPDATE interacciones SET Interacciones = ? WHERE IdInteraccion = ?", [Interacciones, IdInteraccion]);

        res.json({ message: "Interaccion actualizada" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const methods = {
    getInteraccion,
    getInteraccionCortoId,
    getInteraccionPorCampo,
    getInteraccionPorNombre,
    addInteraccion,
    updateInteraccion,
}