import { Request, Response } from "express";
import { createRentalService, deleteRentalService, getRentalByIdService, getRentalsService, updateRentalService } from "../services/rental.service";

export async function createRentalController(req: Request, res: Response) {
  try {
    const { propertyId, tenantId, startDate, endDate, dueDay, value } = req.body;

    const rental = await createRentalService({
      propertyId,
      tenantId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      dueDay,
      value
    });

    res.status(201).json(rental);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteRentalController(req: Request, res: Response) {
  const id = Number(req.params.id)

  try {
    const response = await deleteRentalService(id)
    res.status(200).json(response)
  } catch (error) {
    res.status(403).json(error)
  }
}

export async function getRentalsController(req:Request, res: Response) {
  try {
    const data = await getRentalsService()
    res.status(201).json(data);
  } catch (error) {
    console.log("Erro ao buscar alugueis:", error)
    res.status(400).json(error)
  }
}

export async function getRentalByIdController(req: Request, res: Response) {
  const id = Number(req.params.id);

  try {
    const data = await getRentalByIdService(id)
    res.status(200).json(data)
  } catch (error) {
    console.log("Erro ao encontrar aluguel:", error)
    res.send(404).json(error)
  }
}

export async function updateRentalController(req: Request, res: Response) {
  const id = Number(req.params.id);

  try {
    const data = await updateRentalService(id, req.body)
    res.status(200).json(data)
  } catch (error) {
    console.log("Erro ao atualizar aluguel: ", error)
    res.status(400).json(error)
  }
}
