import { Request, Response } from "express";
import { createRentalService } from "../services/rental.service";

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
