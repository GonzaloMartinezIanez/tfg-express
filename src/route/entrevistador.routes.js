import { Router } from "express";
import { methods as entrevistadorController } from "./../controller/entrevistador.controller";
import { methods as auth } from "./../middleware/verificacion"

const router = Router();

router.get("/api/entrevistador", auth.verifyToken, entrevistadorController.getEntrevistador);
//router.post("/api/entrevistador", auth.verifyToken, entrevistadorController.addEntrevistador);
//router.delete("/api/entrevistador/", auth.verifyToken, entrevistadorController.deleteEntrevistador);
router.put("/api/entrevistador", auth.verifyToken, entrevistadorController.updateEntrevistador);

export default router;