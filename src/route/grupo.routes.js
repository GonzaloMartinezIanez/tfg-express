import { Router } from "express";
import { methods as grupoController } from "./../controller/grupo.controller";
import { methods as authController } from "./../controller/auth.controller"

const router = Router();

router.get("/api/grupo", authController.verifyToken, grupoController.getGrupo);
router.get("/api/grupo/:id", authController.verifyToken, grupoController.getGrupoId);
router.get("/api/grupointeraccion/:id", authController.verifyToken, grupoController.getGrupoInteraccionId);
router.get("/api/grupocorto", authController.verifyToken, grupoController.getGrupoCorto);
router.get("/api/grupopersonas/:id", authController.verifyToken, grupoController.getPersonasEnGrupo);
router.post("/api/grupo", authController.verifyToken, grupoController.addGrupo);

export default router;