import { Router } from "express";
import { methods as entrevistadorController } from "./../controller/entrevistador.controller";
import { methods as auth } from "./../middleware/verificacion"

const router = Router();

router.get("/api/entrevistador", auth.verifyToken, entrevistadorController.getEntrevistador);
router.get("/api/entrevistadores", auth.verifyTokenAdmin, entrevistadorController.getEntrevistadores);
router.get("/api/entrevistadorNombre/:id", auth.verifyToken, entrevistadorController.getEntrevistadorNombre);
//router.post("/api/entrevistador", auth.verifyToken, entrevistadorController.addEntrevistador);
//router.delete("/api/entrevistador/", auth.verifyToken, entrevistadorController.deleteEntrevistador);
router.put("/api/entrevistador", auth.verifyToken, entrevistadorController.updateEntrevistador);
router.put("/api/modificarEntrevistador", auth.verifyTokenAdmin, entrevistadorController.updateEntrevistadorAdministrador);
router.put("/api/cambiarContrasenia", auth.verifyToken, entrevistadorController.changePassword);
router.put("/api/cambiarContraseniaAdmin", auth.verifyTokenAdmin, entrevistadorController.changePasswordAdmin);
router.post("/api/registrar", auth.verifyTokenAdmin, entrevistadorController.registrar);

export default router;