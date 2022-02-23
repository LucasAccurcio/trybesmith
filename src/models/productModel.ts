import { ResultSetHeader } from 'mysql2';
import { BaseProduct, Product } from '../interfaces/ProductInterface';

import connection from './connection';

export async function create(newProduct: BaseProduct) {
  const { name, amount } = newProduct;
  const [result] = await connection
    .execute<ResultSetHeader>(
    'INSERT INTO Products (name, amount) VALUES (?, ?)',
    [name, amount],
  );
  const { insertId: id } = result;

  const insertedProduct: Product = { id, name, amount };

  return insertedProduct;
}

export async function findAll(): Promise<Product[]> {
  const [result] = await connection
    .execute('SELECT * FROM Products');
  return result as Product[];
}
