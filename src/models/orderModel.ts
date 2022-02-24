import { ResultSetHeader } from 'mysql2';
import { Order } from '../interfaces/OrderInterface';

import connection from './connection';

export async function create(userId: number) {
  const [result] = await connection
    .execute<ResultSetHeader>(
    'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
    [userId],
  );
  const { insertId: id } = result;

  const insertedProduct: Order = { id, userId };

  return insertedProduct;
}

export async function findById(id: string): Promise<Order[]> {
  const [result] = await connection
    .execute('SELECT * FROM Trybesmith.Orders WHERE id = ?', [id]);

  return result as Order[];
}

export async function findAll(): Promise<Order[]> {
  const [result] = await connection
    .execute('SELECT * FROM Trybesmith.Orders');
  return result as Order[];
}
