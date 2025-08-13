import { Router } from "express";
import {
  createPropertyController,
  getAllPropertiesController,
  getPropertyByIdController,
  updatePropertyController,
  deletePropertyController
} from "../controllers/property.controller";
import { authMiddleware } from "../middlwares/auth.middleware";
import { roleMiddleware } from "../middlwares/role.middleware";

const router = Router();

// Apenas ADMIN pode criar, atualizar e deletar propriedades
router.post("/", authMiddleware, roleMiddleware(["ADMIN"]), createPropertyController);
router.put("/:id", authMiddleware, roleMiddleware(["ADMIN"]), updatePropertyController);
router.delete("/:id", authMiddleware, roleMiddleware(["ADMIN"]), deletePropertyController);

// Listagem e detalhes acessíveis a todos logados
router.get("/", authMiddleware, getAllPropertiesController);
router.get("/:id", authMiddleware, getPropertyByIdController);

export default router;
