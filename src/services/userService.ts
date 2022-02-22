import { BaseUser, User } from '../interfaces/UserInterface';
import { Users } from '../interfaces/UsersInterface';
import * as userModel from '../models/userModel';

export default async function create(newItem: BaseUser): Promise<User> {
  const createUser = await userModel.default(newItem);
  
  return createUser;
}

export async function findAll(): Promise<Users[]> {
  const users = await userModel.findAll();

  return users;
}

// export const find = async (id: number): Promise<User> => {

// };