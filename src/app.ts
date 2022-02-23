import express, { Request, Response, NextFunction } from 'express';
import validationUser from './controllers/middlewares/createUserValidations';
import loginValidations from './controllers/middlewares/loginValidations';

import { create, findAll, login } from './controllers/userController';

require('express-async-errors');

const app = express();

app.use(express.json());

app.post('/users', validationUser, create);
app.get('/users', findAll);
app.post('/login', loginValidations, login);  

app.use((err:object, _req: Request, res: Response, _next: NextFunction) => {
  console.log(Error, err);
  res.status(500);
  res.json({ error: 'Deu errado!' }); 
});

export default app;
