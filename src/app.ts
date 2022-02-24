import express, { Request, Response, NextFunction } from 'express';
import validationUser from './controllers/middlewares/createUserValidations';
import validationProduct from './controllers/middlewares/createProductValidations';
import loginValidations from './controllers/middlewares/loginValidations';

import * as user from './controllers/userController';
import * as product from './controllers/productController';
import * as order from './controllers/orderController';
import validateJWT from './auth/validateJWT';
import validateOrderProduct from './controllers/middlewares/orderProductValidations';

require('express-async-errors');

const app = express();

app.use(express.json());

app.post('/users', validationUser, user.create);
app.get('/users', validateJWT, user.findAll);
app.post('/login', loginValidations, user.login);  
app.post('/products', validateJWT, validationProduct, product.create);
app.get('/products', validateJWT, product.findAll);
app.get('/orders', validateJWT, order.findAll);
app.post('/orders', validateJWT, validateOrderProduct, order.create);
app.get('/orders/:id', validateJWT, order.findById);

app.use((err:object, _req: Request, res: Response, _next: NextFunction) => {
  console.log(Error, err);
  res.status(500);
  res.json({ error: 'Algo saiu errado!' }); 
});

export default app;
