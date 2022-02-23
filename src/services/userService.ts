import { BaseUser, User } from '../interfaces/UserInterface';
import { Users } from '../interfaces/UsersInterface';
import { LoginUser } from '../interfaces/LoginInterface';
import * as userModel from '../models/userModel';

export async function create(newItem: BaseUser): Promise<User> {
  const createUser = await userModel.create(newItem);
  
  return createUser;
}

export async function findAll(): Promise<Users> {
  const users = await userModel.findAll();

  return users;
}

export async function login(userData: LoginUser): Promise<LoginUser> {
  const { username, password } = userData;
  const user = await userModel.login(username);
  if (!user) return { username: 'error', password: 'error' };
  if (user.username !== username || user.password !== password) { 
    return { username: 'error', password: 'error' }; 
  }
  return user as LoginUser;
}