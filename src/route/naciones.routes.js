import { Router } from "express";
import { methods as nacionesController } from "../controller/naciones.controller";
import { methods as auth } from "./../middleware/verificacion"

const router = Router();

router.get("/api/naciones", auth.verifyToken, nacionesController.getNaciones);
router.get("/api/entidades", auth.verifyToken, nacionesController.getEntidades);
router.get("/api/municipios/:id", auth.verifyToken, nacionesController.getMunicipiosId);

export default router;