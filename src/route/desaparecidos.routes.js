import { Router } from "express";
import { methods as desaparecidosController } from "../controller/desaparecidos.controller";
import { methods as authController } from "./../controller/auth.controller"
import { methods  as multerMethods } from "./../middleware/multer"

const router = Router();

router.get("/api/desaparecidos", authController.verifyToken, desaparecidosController.getDesaparecidos);
router.get("/api/desaparecidos/:id", authController.verifyToken, desaparecidosController.getDesaparecidosId);
router.get("/api/desaparecidosPorCampo/:campo/:valor", authController.verifyToken, desaparecidosController.getDesaparecidosPorCampo);
router.post("/api/desaparecidos", [authController.verifyToken, multerMethods.upload.single('Imagen')], desaparecidosController.addDesaparecidos);
router.delete("/api/desaparecidos/:id", authController.verifyToken, desaparecidosController.deleteDesaparecidosId);
router.put("/api/desaparecidos/:id", authController.verifyToken, desaparecidosController.updateDesaparecidosId);


export default router;