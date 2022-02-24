import { ResultSetHeader } from 'mysql2';
import { LoginUser } from '../interfaces/LoginInterface';
import { BaseUser, User } from '../interfaces/UserInterface';

import connection from './connection';

export async function create(newUser: BaseUser) {
  const { username, classe, level, password } = newUser;
  const [result] = await connection
    .execute<ResultSetHeader>(
    'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
    [username, classe, level, password],
  );
  const { insertId: id } = result;

  const insertedUser: User = { id, username, classe, level, password };

  return insertedUser;
}

export async function findAll(): Promise<User[]> {
  const [result] = await connection
    .execute('SELECT * FROM Trybesmith.Users');
  return result as User[];
}

export async function login(name: string): Promise<LoginUser> {
  try {
    const [result] = await connection
      .execute(
        'SELECT username, password FROM Trybesmith.Users WHERE username = ?',
        [name],
      );
    const [user] = result as LoginUser[];
    return user;
  } catch (e) {
    throw Error('Erro de conexão');
  }
}