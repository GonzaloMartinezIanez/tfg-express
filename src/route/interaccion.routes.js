import { Router } from "express";
import { methods as interaccionController } from "./../controller/interaccion.controller";
import { methods as auth } from "./../middleware/verificacion"
import { methods  as multerMethods } from "./../middleware/multer"

const router = Router();

router.get("/api/interaccion", auth.verifyToken, interaccionController.getInteraccion);
router.get("/api/interaccionCorto/:id", auth.verifyToken, interaccionController.getInteraccionCortoId);
router.get("/api/interaccionesPorNombre/:Nombre/:ApellidoPaterno/:ApellidoMaterno", auth.verifyToken, interaccionController.getInteraccionPorNombre);
router.post("/api/interaccionPorCampo/", auth.verifyToken, interaccionController.getInteraccionPorCampo);
router.post("/api/interaccion", [auth.verifyToken, multerMethods.upload.single('Imagen')], interaccionController.addInteraccion);
//router.delete("/api/interaccion/:id", auth.verifyToken, interaccionController.deleteInteraccionId);
router.put("/api/interaccion/", auth.verifyToken, interaccionController.updateInteraccion);


export default router;