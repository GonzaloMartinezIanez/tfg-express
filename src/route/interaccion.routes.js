import { Router } from "express";
import { methods as interaccionController } from "./../controller/interaccion.controller";

const router = Router();

router.get("/api/interaccion", interaccionController.getInteraccion);
router.get("/api/interaccion/:id", interaccionController.getInteraccionId);
router.get("/api/interaccionPorCampo/:campo/:valor", interaccionController.getInteraccionPorCampo);
router.post("/api/interaccion", interaccionController.addInteraccion);
router.delete("/api/interaccion/:id", interaccionController.deleteInteraccionId);
router.put("/api/interaccion/:id", interaccionController.updateInteraccionId);


export default router;