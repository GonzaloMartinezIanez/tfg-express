import express from "express";
import morgan from "morgan";
const cors = require('cors');
var bodyParser = require('body-parser');

import entrevistadorRoutes from "./route/entrevistador.routes.js";
import grupoRoutes from "./route/grupo.routes.js"
import interaccionRoutes from "./route/interaccion.routes.js"
import desaparecidosRoutes from "./route/desaparecidos.routes.js"
import authRoutes from "./route/auth.routes.js"
import nacionesRoutes from "./route/naciones.routes.js"

const app = express();

// Puerto donde se lanza la aplicacion
app.set("port", 3000);

// Middelwares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Rutas
app.use(entrevistadorRoutes);
app.use(grupoRoutes);
app.use(interaccionRoutes);
app.use(desaparecidosRoutes);
app.use(authRoutes);
app.use(nacionesRoutes);

// Ignorar el resto de peticiones
app.get("*", (req, res) => {
    res.status(500);
    res.send("Error");
})

export default app;
