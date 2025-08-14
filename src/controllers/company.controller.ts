import { Request, Response } from "express";
import { createCompanyService, getCompaniesService, getCompanyById } from "../services/company.service";

export async function createCompanyController(req: Request, res: Response) {
  try {
    const company = await createCompanyService(req.body);
    res.status(201).json(company);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export async function getCompaniesController(req:Request, res: Response) {
  try {
    const companies = await getCompaniesService();
    res.status(200).json(companies)
  } catch (error: any) {
    res.status(400).json({ message: error.message });  
  }
}

export async function getCompanyBy(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  try {
    const company = await getCompanyById(id);

    if (!company) {
      return res.status(404).json({ message: "Empresa não encontrada" });
    }

    res.status(200).json(company);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}