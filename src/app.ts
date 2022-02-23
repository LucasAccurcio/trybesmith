import express, { Request, Response, NextFunction } from 'express';
import validationUser from './controllers/middlewares/createUserValidations';
import validationProduct from './controllers/middlewares/createProductValidations';
import loginValidations from './controllers/middlewares/loginValidations';

import * as user from './controllers/userController';
import * as product from './controllers/productController';

require('express-async-errors');

const app = express();

app.use(express.json());

app.post('/users', validationUser, user.create);
app.get('/users', user.findAll);
app.post('/login', loginValidations, user.login);  
app.post('/products', validationProduct, product.create);
app.get('/products', product.findAll);
app.get('/orders');
app.post('/orders');
app.post('/orders/:id');

app.use((err:object, _req: Request, res: Response, _next: NextFunction) => {
  console.log(Error, err);
  res.status(500);
  res.json({ error: 'Deu errado!' }); 
});

export default app;
