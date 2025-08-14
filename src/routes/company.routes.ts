import { Router } from "express";
import { createCompanyController, getCompaniesController } from "../controllers/company.controller";
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

router.get("/", authMiddleware, roleMiddleware(["ADMIN", "GERENTE", "FUNCIONARIO"]), getCompaniesController)

export { router as companyRoutes };
