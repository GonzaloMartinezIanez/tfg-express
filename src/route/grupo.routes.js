import { Router } from "express";
import { methods as grupoController } from "./../controller/grupo.controller";

const router = Router();

router.get("/api/grupo", grupoController.getGrupo);
router.get("/api/grupo/:id", grupoController.getGrupoId);
router.get("/api/grupocorto", grupoController.getGrupoCorto);
router.post("/api/grupo", grupoController.addGrupo);

export default router;