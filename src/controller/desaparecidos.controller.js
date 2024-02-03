import { getConnection } from "../db/database";
import { upload } from "../middleware/multer"

/**
 * Funcion para obtener los registros de personas desaparecidas,
 * solo se obtienen aquellos registros realizados por un
 * entrevistador de la misma intitucion
 */
const getDesaparecidos = async (req, res) => {
    try {
        const connection = await getConnection();
        if (req.cargo == "ADMINISTRADOR") {
            const result = await connection.query("SELECT * FROM desaparecidos");

            res.json(result);
        } else {
            const institucion = await connection.query("SELECT Institucion FROM entrevistadores WHERE IdEntrevistador = ?", req.IdEntrevistador)
            const result = await connection.query("SELECT * FROM desaparecidos d, entrevistadorescorto e WHERE d.IdEntrevistador = e.IdEntrevistador AND e.Institucion = ?", institucion[0].Institucion);
            res.json(result);
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

/**
 * Funcion para obtener un desaparecido a partir del folio
 */
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

/**
 * Funcion para obtener todos los registros que cumplan con una condicion
 */
const getDesaparecidosPorCampo = async (req, res) => {
    try {
        const { campo, valor } = req.params;

        // Comprobar que se han enviado los datos correctamente
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

/**
 * Funcion para añadir un registro de persona desaparecida al sistema
 */
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


        var IdEntrevistador = req.IdEntrevistador;
        const imangenFile = req.file;
        var Imagen = "";

        const connection = await getConnection();
        const existe = await connection.query("SELECT IdDesaparecido FROM desaparecidos WHERE Nombre = '" + Nombre + "' AND ApellidoPaterno = '" + ApellidoPaterno + "' AND ApellidoMaterno = '" + ApellidoMaterno + "' AND FechaNacimiento = '" + FechaNacimiento + "';");

        if (existe.length != 0) {
            res.json({ message: "La persona ya esta registrada", folio: existe[0].IdDesaparecido });
        } else {
            // En el caso de que el middleware de multer haya encontrado
            // una imagen, se guardara la ruta en la base de datos
            if (imangenFile != undefined) {
                Imagen = req.file.path.split("uploads\\")[1];
            }

            // Comprobar que se han enviado los datos correctamente
            if (Nombre === undefined || ApellidoPaterno === undefined || ApellidoMaterno === undefined || FechaNacimiento === undefined || Nacionalidad === undefined || InformacionUsadaPara === undefined || InformacionPublica === undefined || Institucion === undefined) {
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
                Cargo,
                IdEntrevistador
            }

            //const result = await connection.query("INSERT INTO desaparecidos SET ?", desaparecido);

            res.json({ message: "Persona desaparecida añadida" });
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

/* const deleteDesaparecidosId = async (req, res) => {
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


export const methods = {
    getDesaparecidos,
    getDesaparecidosId,
    getDesaparecidosPorCampo,
    addDesaparecidos
}