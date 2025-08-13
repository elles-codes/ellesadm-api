import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../config/jwt/jwt";

const prisma = new PrismaClient();

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { role: true }
  });

  if (!user) throw new Error("Usuário não encontrado");

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw new Error("Senha incorreta");

  const payload = { userId: user.id, role: user.role.name };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  // Calcula expiração do refresh token
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 dias de validade

  // Salva no banco
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt
    }
  });

  return { accessToken, refreshToken, user };
}

export async function createUserService(data: {
  name: string;
  email: string;
  password: string;
  roleId: number;
}) {
  // Verifica se email já existe
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email }
  });

  if (existingUser) {
    throw new Error("Email já cadastrado");
  }

  // Criptografa a senha
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      roleId: data.roleId
    },
    include: { role: true }
  });

  return user;
}