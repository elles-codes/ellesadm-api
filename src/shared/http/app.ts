import express from "express";
import dotenv from "dotenv";
import authRoutes from "../../routes/auth.routes";
import { authMiddleware } from "../../middlwares/auth.middleware";
import { roleMiddleware } from "../../middlwares/role.middleware";
import userRoutes from "../../routes/user.routes";
import rentalRoutes from "../../routes/rental.routes";
import propertyRoutes from "../../routes/property.routes"
import {companyRoutes} from "../../routes/company.routes"

// Carrega variáveis de ambiente
dotenv.config();

const app = express();
app.use(express.json());

// Rotas públicas
app.use("/auth", authRoutes);

// Rota de teste protegida
app.get("/admin-only", authMiddleware, roleMiddleware(["ADMIN"]), (req, res) => {
  res.json({ message: "Você é um ADMIN, acesso liberado!" });
});
app.use("/users", userRoutes);
app.use("/rentals", rentalRoutes)
app.use("/property", propertyRoutes)
app.use("/company", companyRoutes)

export default app;
