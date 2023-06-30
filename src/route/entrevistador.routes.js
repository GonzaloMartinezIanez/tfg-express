import { Router } from "express";
import { methods as entrevistadorController } from "./../controller/entrevistador.controller";
import { methods as authController } from "./../controller/auth.controller"

const router = Router();

router.get("/api/entrevistador", authController.verifyToken, entrevistadorController.getEntrevistador);
router.post("/api/entrevistador", authController.verifyToken, entrevistadorController.addEntrevistador);
router.delete("/api/entrevistador/", authController.verifyToken, entrevistadorController.deleteEntrevistador);
router.put("/api/entrevistador", authController.verifyToken, entrevistadorController.updateEntrevistador);

export default router;