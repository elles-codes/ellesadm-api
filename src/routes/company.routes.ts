import { Router } from "express";
import { createCompanyController } from "../controllers/company.controller";
import { authMiddleware } from "../middlwares/auth.middleware";
import { roleMiddleware } from "../middlwares/role.middleware";

const router = Router();

// Apenas ADMIN pode criar empresas
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN", "GERENTE"]),
  createCompanyController
);

export { router as companyRoutes };
