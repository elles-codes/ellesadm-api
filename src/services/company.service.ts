import { prisma } from "../lib/prisma/prisma";

interface DocumentInput {
  name: string;
  url: string;
  type: string;
}

interface PartnerInput {
  name: string;
  documents?: DocumentInput[];
  cpf: string;
}

interface CreateCompanyInput {
  name: string;
  cnpj: string;
  documents?: DocumentInput[];
  partners?: PartnerInput[];
}

export async function createCompanyService(data: CreateCompanyInput) {
  const company = await prisma.company.create({
    data: {
      name: data.name,
      cnpj: data.cnpj,
      documents: {
        create: data.documents || []
      },
      partners: {
        create: data.partners?.map(partner => ({
          name: partner.name,
          cpf: partner.cpf,
          documents: {
            create: partner.documents || []
          }
        })) || []
      }
    },
    include: {
      documents: true,
      partners: {
        include: {
          documents: true
        }
      }
    }
  });

  return company;
}

export async function getCompaniesService() {
  return await prisma.company.findMany({
    include: {
      partners: true,
      properties: true,
    },
  });
}

export async function getCompanyById(id: number) {
  return prisma.company.findUnique({
    where: { id },
  });
}