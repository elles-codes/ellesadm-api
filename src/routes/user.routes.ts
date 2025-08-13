import { Router } from "express";
import { authMiddleware } from "../middlwares/auth.middleware";
import { roleMiddleware } from "../middlwares/role.middleware";
import { createUserController } from "../controllers/user.controller";

const router = Router();

// Apenas ADMIN pode criar usuário
router.post("/", authMiddleware, roleMiddleware(["ADMIN"]), createUserController);

export default router;
