import { Request, Response } from 'express';

import * as userService from '../services/userService';
import { BaseUser } from '../interfaces/UserInterface';

export async function create(req: Request, res: Response) {
  const item: BaseUser = req.body;

  const newItem = await userService.default(item);

  res.status(201).json(newItem);
}

export async function findAll(req: Request, res: Response) {
  const users = await userService.findAll();
  res.status(201).json(users);
}