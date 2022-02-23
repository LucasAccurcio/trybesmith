import { Request, Response } from 'express';

import * as productService from '../services/productService';
import { BaseProduct } from '../interfaces/ProductInterface';

export async function create(req: Request, res: Response) {
  const item: BaseProduct = req.body;

  const newItem = await productService.create(item);

  res.status(201).json(newItem);
}

export async function findAll(req: Request, res: Response) {
  const products = await productService.findAll();
  res.status(201).json(products);
}
