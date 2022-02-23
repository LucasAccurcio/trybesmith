import { Request, Response, NextFunction } from 'express';

import { verify } from 'jsonwebtoken';
import { LoginUser } from '../interfaces/LoginInterface';
import * as userModel from '../models/userModel';

// https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
declare module 'express-serve-static-core' {
  interface Request {
    user: LoginUser;
  }
}

const secret = 'meusegredo';

async function validateJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token not found' });
  }

  try {
    const decoded = verify(token, secret) as LoginUser;
    const user = await userModel.login(decoded.username);

    if (!user) {
      return res.status(401)
        .json({ error: 'Invalid login or password' });
    }

    req.user = user;

    next();
  } catch (err) {
    // console.error(err.error);e
    return res.status(401).json({ error: 'Invalid token' });
  }
}

export default validateJWT;