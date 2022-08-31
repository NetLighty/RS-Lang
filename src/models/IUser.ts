export interface User {
  email: string;
  password: string;
}

export interface IUser extends User {
  name: string;
}

export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  password: string;
}
export interface IUserUpdate {
  id: string;
  name: string;
  email: string;
}
