import { Request, Response } from 'express';

import * as orderService from '../services/orderService';
import * as productModel from '../models/productModel';

export async function create(req: Request, res: Response) {
  const { id } = req.user;
  const newItem = await orderService.create(id);

  const { products } = req.body;

  const promise = products.map(async (product: number) => {
    await productModel.update(newItem.id, product);
  });
  Promise.allSettled(promise);

  res.status(201).json({ 
    order: 
      { 
        userId: newItem.userId,
        products,
      } });
}

export async function findById(req: Request, res: Response) {
  const { id } = req.params;
  const order = await orderService.findById(id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.status(200).json(order);
}

export async function findAll(req: Request, res: Response) {
  const order = await orderService.findAll();
  res.status(201).json(order);
}
