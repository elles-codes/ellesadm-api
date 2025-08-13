import { Request, Response } from "express";
import { createCompanyService } from "../services/company.service";

export async function createCompanyController(req: Request, res: Response) {
  try {
    const company = await createCompanyService(req.body);
    res.status(201).json(company);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}