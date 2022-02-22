export interface BaseUser {
  username: string;
  classe: string;
  level: string;
  password: string;
}

export interface User extends BaseUser {
  id: number;
}