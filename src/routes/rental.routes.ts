import { Router } from "express";
import { authMiddleware } from "../middlwares/auth.middleware";
import { roleMiddleware } from "../middlwares/role.middleware";
import { createRentalController } from "../controllers/rental.controller";

const router = Router();

router.post(
  "/",
  authMiddleware, roleMiddleware(["ADMIN"]), 
  createRentalController
);

export default router;
