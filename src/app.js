import express from "express";
import morgan from "morgan";
var cors = require('cors');


// Routes
import entrevistadorRoutes from "./route/entrevistador.routes";
import grupoRoutes from "./route/grupo.routes"
import interaccionRoutes from "./route/interaccion.routes"
import desaparecidosRoutes from "./route/desaparecidos.routes"

const app = express();

// Settings
app.set("port", 3000);

// Middelware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Routes
app.use(entrevistadorRoutes);
app.use(grupoRoutes);
app.use(interaccionRoutes);
app.use(desaparecidosRoutes);


export default app;
