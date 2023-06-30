import { getConnection } from "../db/database";
import { upload } from "../middleware/multer"

const getDesaparecidos = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM desaparecidos");

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getDesaparecidosId = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM desaparecidos WHERE IdDesaparecido = ?", id);

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getDesaparecidosPorCampo = async (req, res) => {
    try {
        const { campo, valor } = req.params;

        if (campo === undefined || valor === undefined) {
            res.status(400).json({ message: "Bad request" });
        }

        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM desaparecidos WHERE " + campo + " = '" + valor + "'");

        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const addDesaparecidos = async (req, res) => {
    try {
        const {
            FolioInstitucion,
            FolioRNPDNO,
            FechaEntrevista,
            Nombre,
            ApellidoPaterno,
            ApellidoMaterno,
            NombreSocial,
            Alias,
            NacionalidadAlias,
            Sexo,
            FechaNacimiento,
            Nacionalidad,
            EstadoCivil,
            ViajaConIdentificacion,
            ViajaConIdentificacionCual,
            UltimoDomicilio,
            IdiomaMaterno,
            HablaEspañol,
            OtrosIdiomas,
            OtrosIdiomasCual,
            PuebloOriginario,
            PuebloOriginarioCual,
            Afrodescendiente,
            IdiomaPadresAbuelos,
            IdiomaPadresAbuelosCual,
            SexoIdentifica,
            OrientacionSexual,
            OrientacionSexualCual,
            Profesion,
            EdadMigracion,
            AñoComienzoMigracion,
            MotivoMigracion,
            NumeroMigraciones,
            RelatoDesaparicion,
            PaisPerdidaContacto,
            PaisPerdidaContactoCual,
            MunicipioPerdidaContacto,
            LugarCrucePretendia,
            LugarCruceConfirmado,
            PaisObjetivo,
            EstadoObjetivo,
            MunicipioObjetivo,
            FechaUltimaComunicacion,
            PersonaUltimaComunicacion,
            DeportadaAnteriormente,
            PaisDeportacion,
            FechaUltimaDeportacion,
            Encarcelado,
            UbicacionCarcel,
            FechaDetencion,
            IdentificacionDetencionEEUU,
            PapelesFalsos,
            PapelesFalsosCual,
            AcompañantesViaje,
            ConocidosEnExtranjero,
            Estatura,
            Peso,
            Complexion,
            ColorPiel,
            VelloFacial,
            VelloFacialCual,
            Lentes,
            Cabello,
            Embarazada,
            MesesEmbarazo,
            NumeroCelular,
            SeñalesParticulares,
            Lesiones,
            TipoDientes,
            EstadoSalud,
            DescripcionPrendas,
            RedesSociales,
            HayDenuncia,
            HayDenunciaCual,
            HayReporte,
            HayReporteCual,
            AvancesDenuncia,
            AvancesDenunciaCual,
            LugaresBusqueda,
            NombreQuienBusca,
            ApellidoPaternoQuienBusca,
            ApellidoMaternoQuienBusca,
            ParentescoQuienBusca,
            DireccionQuienBusca,
            TelefonoQuienBusca,
            CorreoElectronicoQuienBusca,
            MensajeQuienBusca,
            InformacionUsadaPara,
            InformacionPublica,
            Entrevistador,
            Institucion,
            Cargo
        } = req.body;

        const imangenFile = req.file;
        var Imagen = "";

        if(imangenFile != undefined){
            Imagen = req.file.path;
        }
        
        if(Nombre === undefined || ApellidoPaterno === undefined || ApellidoMaterno === undefined || FechaNacimiento === undefined || Nacionalidad === undefined || InformacionUsadaPara === undefined || InformacionPublica === undefined || Institucion === undefined){
            res.status(400).json({ message: "Bad request" });
        }

        const desaparecido = {
            FolioInstitucion,
            FolioRNPDNO,
            FechaEntrevista,
            Nombre,
            ApellidoPaterno,
            ApellidoMaterno,
            NombreSocial,
            Alias,
            NacionalidadAlias,
            Sexo,
            FechaNacimiento,
            Nacionalidad,
            EstadoCivil,
            ViajaConIdentificacion,
            ViajaConIdentificacionCual,
            UltimoDomicilio,
            IdiomaMaterno,
            HablaEspañol,
            OtrosIdiomas,
            OtrosIdiomasCual,
            PuebloOriginario,
            PuebloOriginarioCual,
            Afrodescendiente,
            IdiomaPadresAbuelos,
            IdiomaPadresAbuelosCual,
            SexoIdentifica,
            OrientacionSexual,
            OrientacionSexualCual,
            Profesion,
            EdadMigracion,
            AñoComienzoMigracion,
            MotivoMigracion,
            NumeroMigraciones,
            RelatoDesaparicion,
            PaisPerdidaContacto,
            PaisPerdidaContactoCual,
            MunicipioPerdidaContacto,
            LugarCrucePretendia,
            LugarCruceConfirmado,
            PaisObjetivo,
            EstadoObjetivo,
            MunicipioObjetivo,
            FechaUltimaComunicacion,
            PersonaUltimaComunicacion,
            DeportadaAnteriormente,
            PaisDeportacion,
            FechaUltimaDeportacion,
            Encarcelado,
            UbicacionCarcel,
            FechaDetencion,
            IdentificacionDetencionEEUU,
            PapelesFalsos,
            PapelesFalsosCual,
            AcompañantesViaje,
            ConocidosEnExtranjero,
            Estatura,
            Peso,
            Complexion,
            ColorPiel,
            VelloFacial,
            VelloFacialCual,
            Lentes,
            Cabello,
            Embarazada,
            MesesEmbarazo,
            NumeroCelular,
            SeñalesParticulares,
            Lesiones,
            TipoDientes,
            EstadoSalud,
            DescripcionPrendas,
            RedesSociales,
            Imagen,
            HayDenuncia,
            HayDenunciaCual,
            HayReporte,
            HayReporteCual,
            AvancesDenuncia,
            AvancesDenunciaCual,
            LugaresBusqueda,
            NombreQuienBusca,
            ApellidoPaternoQuienBusca,
            ApellidoMaternoQuienBusca,
            ParentescoQuienBusca,
            DireccionQuienBusca,
            TelefonoQuienBusca,
            CorreoElectronicoQuienBusca,
            MensajeQuienBusca,
            InformacionUsadaPara,
            InformacionPublica,
            Entrevistador,
            Institucion,
            Cargo
        }

        const connection = await getConnection();

        const result = await connection.query("INSERT INTO desaparecidos SET ?", desaparecido);

        console.log(result)

        res.json({ message: "Persona desaparecida añadida" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
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