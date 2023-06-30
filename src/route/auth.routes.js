import { Router } from "express";
import { methods as authController } from "./../controller/auth.controller";

const router = Router();

router.post("/api/auth", authController.login);

export default router;