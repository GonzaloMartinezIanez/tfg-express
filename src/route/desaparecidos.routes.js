import { Router } from "express";
import { methods as desaparecidosController } from "../controller/desaparecidos.controller";
import { methods as auth } from "./../middleware/verificacion"
import { methods  as multerMethods } from "./../middleware/multer"

const router = Router();

router.get("/api/desaparecidos", auth.verifyToken, desaparecidosController.getDesaparecidos);
router.get("/api/desaparecidos/:id", auth.verifyToken, desaparecidosController.getDesaparecidosId);
router.get("/api/desaparecidosPorCampo/:campo/:valor", auth.verifyToken, desaparecidosController.getDesaparecidosPorCampo);
router.post("/api/desaparecidos", [auth.verifyToken, multerMethods.upload.single('Imagen')], desaparecidosController.addDesaparecidos);
//router.delete("/api/desaparecidos/:id", auth.verifyToken, desaparecidosController.deleteDesaparecidosId);

export default router;