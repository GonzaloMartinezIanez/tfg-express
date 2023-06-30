import { Router } from "express";
import { methods as interaccionController } from "./../controller/interaccion.controller";
import { methods as authController } from "./../controller/auth.controller"
import { methods  as multerMethods } from "./../middleware/multer"

const router = Router();

router.get("/api/interaccion", authController.verifyToken, interaccionController.getInteraccion);
router.get("/api/interaccion/:id", authController.verifyToken, interaccionController.getInteraccionId);
router.get("/api/interaccionPorCampo/:campo/:valor", authController.verifyToken, interaccionController.getInteraccionPorCampo);
router.post("/api/interaccion", [authController.verifyToken, multerMethods.upload.single('Imagen')], interaccionController.addInteraccion);
router.delete("/api/interaccion/:id", authController.verifyToken, interaccionController.deleteInteraccionId);
router.put("/api/interaccion/", authController.verifyToken, interaccionController.updateInteraccion);


export default router;