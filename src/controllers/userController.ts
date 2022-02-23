import { Request, Response } from 'express';

import { sign } from 'jsonwebtoken';
import * as userService from '../services/userService';
import { BaseUser } from '../interfaces/UserInterface';
import { LoginUser } from '../interfaces/LoginInterface';

export async function create(req: Request, res: Response) {
  const item: BaseUser = req.body;

  await userService.create(item);
  const { username, password } = req.body;
  const userData = { username, password };
  const secret = 'meusegredo';
  const token = sign(userData, secret);

  res.status(201).json({ token });
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

  const userData = users;
  const secret = 'meusegredo';
  const token = sign(userData, secret);

  res.status(200).json({ token });
}