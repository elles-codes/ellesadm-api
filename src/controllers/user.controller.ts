import { Request, Response } from "express";
import { createUserService, getUserProfile, getUsersService } from "../services/user.service";

export async function createUserController(req: Request, res: Response) {
  const { name, email, password, roleId } = req.body;

  if (!name || !email || !password || !roleId) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });
  }

  try {
    const user = await createUserService({ name, email, password, roleId });
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role.name
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function getProfileController(req: Request, res: Response) {
  const userId = req.user!.userId;
  
  try {
    const data = await getUserProfile(userId)
    res.status(200).json(data)
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}


export async function getUsersController(req: Request, res: Response) {
  try {
    const filters = {
      role: req.query.role as string,
      email: req.query.email as string,
      companyId: req.query.companyId ? Number(req.query.companyId) : undefined,
    };

    const data = await getUsersService(filters);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Erro ao buscar usuários" });
  }
}

