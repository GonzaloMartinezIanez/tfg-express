import { getConnection } from "../db/database";
import { upload } from "../middleware/multer"

const getDesaparecidos = async (req, res) => {
    /* try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM interacciones");

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    } */
}

const getDesaparecidosId = async (req, res) => {
    /* try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM interacciones WHERE IdInteraccion = ?", id);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    } */
}

const getDesaparecidosPorCampo = async (req, res) => {
    /* try {
        const { campo, valor } = req.params;

        if (campo === undefined || valor === undefined) {
            res.status(400).json({ message: "Bad request" });
        }

        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM interacciones WHERE " + campo + " = '" + valor + "'");

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    } */
}

const addDesaparecidos = async (req, res) => {
    /* try {
        const { Nombre, ApellidoPaterno, ApellidoMaterno, NombreSocial, FechaNacimiento, Sexo, Nacionalidad, Estado, Municipio, LugarFrecuenta, LugarActual, SituacionCalle, MigrantesMexicanas, TrabajadorCampo, DesplazadasForzadasInternas, MigrantesExtranjeras, Deportadas, TrabajadorHogar, DescripcionFisica, Necesidades, MensajeFamiliares, Imagen, SaludFisica, SaludMental, Observaciones, Folio, IdGrupo } = req.body;
        const imangenFile = req.file;

        if (imangenFile != undefined) {
            
        }

        if (Nombre === undefined || ApellidoPaterno === undefined || ApellidoMaterno === undefined || NombreSocial === undefined || FechaNacimiento === undefined || Sexo === undefined || Nacionalidad === undefined || Estado === undefined || Municipio === undefined || LugarFrecuenta === undefined || LugarActual === undefined || SituacionCalle === undefined || MigrantesMexicanas === undefined || TrabajadorCampo === undefined || DesplazadasForzadasInternas === undefined || MigrantesExtranjeras === undefined || Deportadas === undefined || TrabajadorHogar === undefined || DescripcionFisica === undefined || Necesidades === undefined || MensajeFamiliares === undefined || Necesidades === undefined || Imagen === undefined || SaludFisica === undefined || SaludMental === undefined || Observaciones === undefined || Folio === undefined || IdGrupo === undefined) {
            res.status(400).json({ message: "Bad request" });
        }

        const interaccion = {
            Nombre, ApellidoPaterno, ApellidoMaterno, NombreSocial, FechaNacimiento, Sexo, Nacionalidad, Estado, Municipio, LugarFrecuenta, LugarActual, SituacionCalle, MigrantesMexicanas, TrabajadorCampo, DesplazadasForzadasInternas, MigrantesExtranjeras, Deportadas, TrabajadorHogar, DescripcionFisica, Necesidades, MensajeFamiliares, Imagen, SaludFisica, SaludMental, Observaciones, Folio
        }

        const connection = await getConnection();

        const result = await connection.query("INSERT INTO interacciones SET ?", interaccion);

        if (IdGrupo != "Sin grupo") {
            // Añadir la interaccion al grupo que pertenece
        }

        res.json({ message: "Interacción añadida" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    } */
}

const deleteDesaparecidosId = async (req, res) => {
    /* try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM interacciones WHERE IdInteraccion = ?", id);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    } */
}

const updateDesaparecidosId = async (req, res) => {
    /* try {
        const { id } = req.params;
        const { Nombre, ApellidoPaterno, ApellidoMaterno, NombreSocial, FechaNacimiento, Sexo, Nacionalidad, Estado, Municipio, LugarFrecuenta, LugarActual, SituacionCalle, MigrantesMexicanas, TrabajadorCampo, DeplazadasForzadasInternas, MigrantesExtranjeras, Deportadas, TrabajadorHogar, DescripcionFisica, Necesidades, MensajeFamiliares, Imagen, SaludFisica, SaludMental, Observaciones, Folio } = req.body;

        if (id === undefined) {
            res.status(400).json({ message: "Bad request" });
        }

        const interaccion = {
            Nombre, ApellidoPaterno, ApellidoMaterno, NombreSocial, FechaNacimiento, Sexo, Nacionalidad, Estado, Municipio, LugarFrecuenta, LugarActual, SituacionCalle, MigrantesMexicanas, TrabajadorCampo, DeplazadasForzadasInternas, MigrantesExtranjeras, Deportadas, TrabajadorHogar, DescripcionFisica, Necesidades, MensajeFamiliares, Imagen, SaludFisica, SaludMental, Observaciones, Folio
        }

        const connection = await getConnection();
        const result = await connection.query("UPDATE interacciones SET ? WHERE IdInteraccion = ?", [interaccion, id]);

        res.json("Interaccion actualizada");
    } catch (error) {
        res.status(500);
        res.send(error.message);
    } */
}


export const methods = {
    getDesaparecidos,
    getDesaparecidosId,
    getDesaparecidosPorCampo,
    addDesaparecidos,
    deleteDesaparecidosId,
    updateDesaparecidosId
}