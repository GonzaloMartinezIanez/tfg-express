import { Router } from "express";
import { methods as grupoController } from "./../controller/grupo.controller";
import { methods as auth } from "./../middleware/verificacion"

const router = Router();

router.get("/api/grupo", auth.verifyToken, grupoController.getGrupo);
router.get("/api/grupo/:id", auth.verifyToken, grupoController.getGrupoId);
router.get("/api/grupointeraccion/:id", auth.verifyToken, grupoController.getGrupoInteraccionId);
router.get("/api/grupocorto", auth.verifyToken, grupoController.getGrupoCorto);
router.get("/api/grupopersonas/:id", auth.verifyToken, grupoController.getPersonasEnGrupo);
router.post("/api/grupo", auth.verifyToken, grupoController.addGrupo);

export default router;