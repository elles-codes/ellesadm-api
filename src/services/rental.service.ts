import { prisma } from "../lib/prisma/prisma";

interface RentalInput {
  propertyId: number;
  tenantId: number;
  startDate: Date;
  endDate: Date;
  dueDay: number;
  value: number;
}

export async function createRentalService(data: RentalInput) {
  // Verifica se o tenant existe e é inquilino
  const tenant = await prisma.user.findUnique({
    where: { id: data.tenantId },
    include: { role: true }
  });

  if (!tenant) {
    throw new Error("Inquilino não encontrado");
  }

  if (tenant.role.name !== "INQUILINO") {
    throw new Error("O usuário selecionado não é um inquilino");
  }

  // Verifica se a propriedade existe
  const property = await prisma.property.findUnique({
    where: { id: data.propertyId }
  });

  if (!property) {
    throw new Error("Propriedade não encontrada");
  }

  // Cria o aluguel
  const rental = await prisma.rental.create({
    data: {
      propertyId: data.propertyId,
      tenantId: data.tenantId,
      startDate: data.startDate,
      endDate: data.endDate,
      dueDay: data.dueDay,
      value: data.value
    }
  });

  return rental;
}

export async function getRentalsService() {
  return await prisma.rental.findMany({ include: {property: true, tenant: true, payments: true, _count: true} });
}

export async function getRentalByIdService(id: number) {
  return await prisma.rental.findUnique({where: {id}, include: {property: true, tenant: true, _count: true, payments: true}})
}

export async function updateRentalService(id: number, data: RentalInput) {
  // Verifica se o tenant existe e é inquilino
  const tenant = await prisma.user.findUnique({
    where: { id: data.tenantId },
    include: { role: true }
  });

  if (!tenant) {
    throw new Error("Inquilino não encontrado");
  }

  if (tenant.role.name !== "INQUILINO") {
    throw new Error("O usuário selecionado não é um inquilino");
  }

  // Verifica se a propriedade existe
  const property = await prisma.property.findUnique({
    where: { id: data.propertyId }
  });

  if (!property) {
    throw new Error("Propriedade não encontrada");
  }

  // Atualiza o aluguel
  const rental = await prisma.rental.update({where: {id}, data})
}
