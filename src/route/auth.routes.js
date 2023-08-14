import { Router } from "express";
import { methods as authController } from "./../controller/auth.controller";
import { methods as auth } from "./../middleware/verificacion"

const router = Router();

router.post("/api/auth", authController.login);
router.get("/api/administrador", auth.verifyToken, authController.administrador)

export default router;