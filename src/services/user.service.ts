import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../config/jwt/jwt";

const prisma = new PrismaClient();

interface UserFilters {
  role?: string;
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

export async function getUserProfile(userId: number) {
  return prisma.user.findUnique({
    where: { id: userId },
    include: {
      role: true,
      companies: true,
      rentals: {
        include: {
          property: true,
          payments: true,
        },
      },
      refreshTokens: true,
    },
  });
}

export async function getUsersService(filters: UserFilters = {}) {
  const where: any = {};

  if (filters.role) {
    where.role = { name: filters.role };
  }

  return prisma.user.findMany({
    where,
    select: {
      id: true,
      name: true,
      email: true,
      role: { select: { id: true, name: true } }, // inclui a role
      companies: { select: { id: true, name: true } },
      rentals: { select: { id: true, value: true, startDate: true, endDate: true } },
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { name: "asc" },
  });
}


