import { Request, Response } from 'express';

import * as orderService from '../services/orderService';
import * as productModel from '../models/productModel';
// import { Order, OrderProducts } from '../interfaces/OrderInterface';

export async function create(req: Request, res: Response) {
  // const item: OrderProducts = req.body;
  const { id } = req.user;
  const newItem = await orderService.create(id);

  const { products } = req.body;

  Promise.all(products.map(async (product: number) => {
    await productModel.update(product, newItem.id);
  }));

  res.status(201).json({ 
    order: 
      { 
        userId: newItem.userId,
        products,
      } });
}

export async function findAll(req: Request, res: Response) {
  const order = await orderService.findAll();
  res.status(201).json(order);
}
