import { Router } from "express";
import { methods as entrevistadorController } from "./../controller/entrevistador.controller";

const router = Router();

router.get("/api/entrevistador", entrevistadorController.getEntrevistador);
router.get("/api/entrevistador/:id", entrevistadorController.getEntrevistadorId);
router.post("/api/entrevistador", entrevistadorController.addEntrevistador);
router.delete("/api/entrevistador/:id", entrevistadorController.deleteEntrevistadorId);
router.put("/api/entrevistador/:id", entrevistadorController.updateEntrevistadorId);

export default router;