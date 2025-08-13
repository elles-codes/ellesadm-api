import express from "express";
import dotenv from "dotenv";

// Carrega variáveis de ambiente
dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API funcionando 🚀" });
});

export default app;
