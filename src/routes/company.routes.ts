import { Router } from "express";
import { createCompanyController, getCompaniesController, getCompanyBy } from "../controllers/company.controller";
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
// LIST ALL COMPANIES
router.get("/", authMiddleware, roleMiddleware(["ADMIN", "GERENTE", "FUNCIONARIO"]), getCompaniesController)
// GET COMPANY BY ID
router.get("/:id", authMiddleware, roleMiddleware(["ADMIN", "GERENTE", "FUNCIONARIO"]), getCompanyBy)
export { router as companyRoutes };
