import { Request, Response } from 'express';

import * as userService from '../services/userService';
import { BaseUser } from '../interfaces/UserInterface';
import { LoginUser } from '../interfaces/LoginInterface';

export async function create(req: Request, res: Response) {
  const item: BaseUser = req.body;

  const newItem = await userService.create(item);

  res.status(201).json(newItem);
}

export async function findAll(req: Request, res: Response) {
  const users = await userService.findAll();
  res.status(201).json(users);
}

export async function login(req: Request, res: Response) {
  const loginData: LoginUser = req.body;
  const users = await userService.login(loginData);
  if (users.username === 'error') {
    return res.status(401).json({ error: 'Username or password invalid' });
  }
  res.status(201).json(users);
}