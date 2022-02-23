import { Request, Response, NextFunction } from 'express';
import { LoginUser } from '../../interfaces/LoginInterface';

function loginValidations(req: Request, res: Response, next: NextFunction) {
  const { username, password }: LoginUser = req.body;
  if (!username) res.status(400).json({ error: 'Username is required' });
  if (!password) res.status(400).json({ error: 'Password is required' });
  next();
}

export default loginValidations;