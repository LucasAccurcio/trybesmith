import { Order } from '../interfaces/OrderInterface';
import * as orderModel from '../models/orderModel';

export async function create(userId: number): Promise<Order> {
  const createProduct = await orderModel.create(userId);
  
  return createProduct;
}

export async function findAll(): Promise<Order[]> {
  const orders = await orderModel.findAll();

  return orders;
}
