export interface BaseUser {
  username: string;
  classe: string;
  level: number;
  password: string;
}

export interface User extends BaseUser {
  id: number;
}