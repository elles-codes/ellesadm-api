import { Request, Response } from "express";
import { loginUser } from "../services/auth.service";
import { generateAccessToken, verifyRefreshToken } from "../config/jwt/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function loginController(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }

  try {
    const { accessToken, refreshToken, user } = await loginUser(email, password);
     res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true no HTTPS
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
    });

    res.json({
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.name
      }
    });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
}

export async function refreshTokenController(req: Request, res: Response) {
  const { refreshToken } = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token é obrigatório" });
  }

  try {
    // Verifica se o token existe no banco
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: { include: { role: true } } }
    });

    if (!storedToken) return res.status(401).json({ message: "Refresh token inválido" });

    if (new Date() > storedToken.expiresAt) {
      // Token expirado, remove do banco
      await prisma.refreshToken.delete({ where: { id: storedToken.id } });
      return res.status(401).json({ message: "Refresh token expirado" });
    }

    // Verifica a assinatura
    verifyRefreshToken(refreshToken);

    const newAccessToken = generateAccessToken({
      userId: storedToken.user.id,
      role: storedToken.user.role.name
    });

    res.json({ accessToken: newAccessToken });
  } catch (err: any) {
    res.status(401).json({ message: "Refresh token inválido" });
  }
}
