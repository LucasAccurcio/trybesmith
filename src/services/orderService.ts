import { Order, OrderProducts } from '../interfaces/OrderInterface';
import * as orderModel from '../models/orderModel';
import * as productModel from '../models/productModel';

export async function create(userId: number): Promise<Order> {
  const createProduct = await orderModel.create(userId);
  
  return createProduct;
}

export async function findById(id: string): Promise<OrderProducts | boolean> {
  const orders = await orderModel.findById(id);
  if (!orders[0]) return false;
  const products = await productModel.findByOrderId(id);
  const array = products.map((item) => Object.values(item)[0]);

  const obj = {
    id: orders[0].id,
    userId: orders[0].userId,
    products: array,
  };
  return obj as OrderProducts;
}

export async function findAll(): Promise<Order[] | boolean> {
  const orders = await orderModel.findAll();
  if (!orders[0]) return false;
  const products = await productModel.findAll();

  const allOrders = orders.map((order) => ({
    id: order.id,
    userId: order.userId,
    products: products
      .filter((product) => order.id === product.orderId)
      .map((item) => item.id),
  }));

  return allOrders;
}
