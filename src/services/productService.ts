import { BaseProduct, Product } from '../interfaces/ProductInterface';
import { Products } from '../interfaces/ProductsInterface';
import * as productModel from '../models/productModel';

export async function create(newItem: BaseProduct): Promise<Product> {
  const createProduct = await productModel.create(newItem);
  
  return createProduct;
}

export async function findAll(): Promise<Products> {
  const products = await productModel.findAll();

  return products;
}
