import { Request, Response } from 'express';

import * as orderService from '../services/orderService';
// import { Order, OrderProducts } from '../interfaces/OrderInterface';

export async function create(req: Request, res: Response) {
  // const item: OrderProducts = req.body;
  const userId = 1;
  const newItem = await orderService.create(userId);

  res.status(201).json(newItem);
}

export async function findAll(req: Request, res: Response) {
  const order = await orderService.findAll();
  res.status(201).json(order);
}
