import { ResultSetHeader } from 'mysql2';
import { LoginUser } from '../interfaces/LoginInterface';
import { BaseUser, User } from '../interfaces/UserInterface';

import connection from './connection';

export async function create(newUser: BaseUser) {
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

export async function findAll(): Promise<User[]> {
  const [result] = await connection
    .execute('SELECT * FROM Users');
  return result as User[];
}

export async function login(name: string): Promise<LoginUser> {
  const [result] = await connection
    .execute(
      'SELECT username, password FROM Users WHERE username = ?',
      [name],
    );
  const [user] = result as LoginUser[];
  return user;
}