export interface LoginUser {
  username: string;
  password: string;
}

export interface Login extends LoginUser {
  id: number;
}