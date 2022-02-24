import { ResultSetHeader } from 'mysql2';
import { BaseProduct, Product } from '../interfaces/ProductInterface';

import connection from './connection';

export async function create(newProduct: BaseProduct) {
  const { name, amount } = newProduct;
  const [result] = await connection
    .execute<ResultSetHeader>(
    'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
    [name, amount],
  );
  const { insertId: id } = result;

  const insertedProduct: Product = { id, name, amount };

  return insertedProduct;
}

export async function findAll(): Promise<Product[]> {
  const [result] = await connection
    .execute('SELECT * FROM Trybesmith.Products');
  return result as Product[];
}

export async function update(orderId: number, id: number) {
  await connection
    .execute(
      'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?',
      [orderId, id],
    );
  return true;
}
