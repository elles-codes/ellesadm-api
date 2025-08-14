import { Router } from "express";
import { authMiddleware } from "../middlwares/auth.middleware";
import { roleMiddleware } from "../middlwares/role.middleware";
import { createUserController, getProfileController } from "../controllers/user.controller";

const router = Router();

// Apenas ADMIN pode criar usuário
router.post("/", authMiddleware, roleMiddleware(["ADMIN"]), createUserController);
router.get("/me", authMiddleware, getProfileController)

export default router;
