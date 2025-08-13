import { prisma } from "../lib/prisma/prisma";

interface CreatePropertyInput {
  title: string;
  type: string;
  currentOwner: string;
  manager?: string;
  iptuResponsible?: string;
  acquisitionValue?: number;
  registration?: string;
  registrationDoc?: string;
  registrationName?: string;
  registrationDate?: Date;
  registryOffice?: string;
  inscription?: string;
  inscriptionName?: string;
  commonArea?: number;
  privateArea?: number;
  totalArea?: number;
  companyId: number;
}

export async function createPropertyService(data: CreatePropertyInput) {
  const company = await prisma.company.findUnique({ where: { id: data.companyId } });
  if (!company) throw new Error("Empresa não encontrada");

  const property = await prisma.property.create({ data });
  return property;
}

export async function getAllPropertiesService() {
  return prisma.property.findMany({ include: { company: true, rentals: true } });
}

export async function getPropertyByIdService(id: number) {
  const property = await prisma.property.findUnique({
    where: { id },
    include: { company: true, rentals: true }
  });
  if (!property) throw new Error("Propriedade não encontrada");
  return property;
}

export async function updatePropertyService(id: number, data: Partial<CreatePropertyInput>) {
  return prisma.property.update({ where: { id }, data });
}

export async function deletePropertyService(id: number) {
  return prisma.property.delete({ where: { id } });
}
