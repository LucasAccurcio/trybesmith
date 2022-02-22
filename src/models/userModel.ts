import { ResultSetHeader } from 'mysql2';
import { BaseUser, User } from '../interfaces/UserInterface';

import connection from './connection';

export default async function create(newUser: BaseUser) {
  const { username, classe, level, password } = newUser;
  const [result] = await connection
    .execute<ResultSetHeader>(
    'INSERT INTO Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
    [username, classe, level, password],
  );
  const { insertId: id } = result;

  const insertedUser: User = { id, username, classe, level, password };

  return insertedUser;
}

export async function findAll() {
  const [result] = await connection
    .execute('SELECT * FROM Users');
  return Object.values(result);
}
