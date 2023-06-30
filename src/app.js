import express from "express";
import morgan from "morgan";
const cors = require('cors');
var bodyParser = require('body-parser');

// Routes
import entrevistadorRoutes from "./route/entrevistador.routes.js";
import grupoRoutes from "./route/grupo.routes.js"
import interaccionRoutes from "./route/interaccion.routes.js"
import desaparecidosRoutes from "./route/desaparecidos.routes.js"
import authRoutes from "./route/auth.routes.js"
import nacionesRoutes from "./route/naciones.routes.js"

const app = express();

// Settings
app.set("port", 3000);

// Middelware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
/* app.use(bodyParser.urlencoded());
app.use(bodyParser.json()); */

// Routes
app.use(entrevistadorRoutes);
app.use(grupoRoutes);
app.use(interaccionRoutes);
app.use(desaparecidosRoutes);
app.use(authRoutes);
app.use(nacionesRoutes);

export default app;
