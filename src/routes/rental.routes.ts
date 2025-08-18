import { Router } from "express";
import { authMiddleware } from "../middlwares/auth.middleware";
import { roleMiddleware } from "../middlwares/role.middleware";
import { createRentalController, getRentalByIdController, getRentalsController, updateRentalController } from "../controllers/rental.controller";

const router = Router();

router.post(
  "/",
  authMiddleware, roleMiddleware(["ADMIN"]), 
  createRentalController
);
router.get("/", authMiddleware, roleMiddleware(["ADMIN", "GERENTE", "FUNCIONARIO", "JURIDICO"]), getRentalsController)
router.get("/:id", authMiddleware, roleMiddleware(['ADMIN', 'GERENTE', 'FUNCIONARIO', 'FINANCEIRO', 'JURIDICO']), getRentalByIdController)
router.put("/:id", authMiddleware, roleMiddleware(["ADMIN", 'GERENTE']), updateRentalController)
export default router;
