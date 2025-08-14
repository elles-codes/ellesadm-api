import { Router } from "express";
import { loginController, logoutController, refreshTokenController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlwares/auth.middleware";

const router = Router();

router.post("/login", loginController);
router.post("/refresh", refreshTokenController);
router.post("/logout", authMiddleware, logoutController)

export default router;