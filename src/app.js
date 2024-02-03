import express from "express";
import morgan from "morgan";
const cors = require('cors');
var bodyParser = require('body-parser');

import entrevistadorRoutes from "./route/entrevistador.routes";
import grupoRoutes from "./route/grupo.routes"
import interaccionRoutes from "./route/interaccion.routes"
import desaparecidosRoutes from "./route/desaparecidos.routes"
import authRoutes from "./route/auth.routes"
import nacionesRoutes from "./route/naciones.routes"

import { methods as auth } from "./middleware/verificacion"

const app = express();

// Puerto donde se lanza la aplicacion
app.set("port", 3000);

// Middelwares
app.use(morgan("dev"));     // Con este middleware se ven las peticiones
app.use(express.json());
app.use(cors());

// Rutas
app.use(entrevistadorRoutes);
app.use(grupoRoutes);
app.use(interaccionRoutes);
app.use(desaparecidosRoutes);
app.use(authRoutes);
app.use(nacionesRoutes);

// Enviar las imagenes de la base de datos
app.use('/api/imagen', express.static('./uploads/'))

// Ignorar el resto de peticiones
app.all("*", (req, res) => {
    res.status(500);
    res.send("Error");
})

export default app;
