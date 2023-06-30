import { Router } from "express";
import { methods as nacionesController } from "../controller/naciones.controller";
import { methods as authController } from "../controller/auth.controller"

const router = Router();

router.get("/api/naciones", authController.verifyToken, nacionesController.getNaciones);
router.get("/api/entidades", authController.verifyToken, nacionesController.getEntidades);
router.get("/api/entidades/:id", authController.verifyToken, nacionesController.getEntidadesId);
router.get("/api/municipios/:id", authController.verifyToken, nacionesController.getMunicipiosId);

export default router;