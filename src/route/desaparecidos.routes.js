import { Router } from "express";
import { methods as desaparecidosController } from "../controller/desaparecidos.controller";

const router = Router();

router.get("/api/desaparecidos", desaparecidosController.getDesaparecidos);
router.get("/api/desaparecidos/:id", desaparecidosController.getDesaparecidosId);
router.get("/api/desaparecidosPorCampo/:campo/:valor", desaparecidosController.getDesaparecidosPorCampo);
router.post("/api/desaparecidos", desaparecidosController.addDesaparecidos);
router.delete("/api/desaparecidos/:id", desaparecidosController.deleteDesaparecidosId);
router.put("/api/desaparecidos/:id", desaparecidosController.updateDesaparecidosId);


export default router;