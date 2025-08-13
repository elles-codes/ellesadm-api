import { Request, Response } from "express";
import * as propertyService from "../services/property.service";

export async function createPropertyController(req: Request, res: Response) {
  try {
    const property = await propertyService.createPropertyService(req.body);
    res.status(201).json(property);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function getAllPropertiesController(req: Request, res: Response) {
  const properties = await propertyService.getAllPropertiesService();
  res.json(properties);
}

export async function getPropertyByIdController(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const property = await propertyService.getPropertyByIdService(id);
    res.json(property);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
}

export async function updatePropertyController(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    const property = await propertyService.updatePropertyService(id, req.body);
    res.json(property);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function deletePropertyController(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    await propertyService.deletePropertyService(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}