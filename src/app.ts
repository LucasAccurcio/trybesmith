import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

import { create, findAll } from './controllers/userController';

require('express-async-errors');

const app = express();

app.use(express.json());

app.post('/users', create);
app.get('/users', findAll);

app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  res.status(500);
  res.json({ error: err }); 
  next(err);
});

export default app;
