import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../config/jwt/jwt";

const prisma = new PrismaClient();

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