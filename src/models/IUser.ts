export interface User {
  email: string;
  password: string;
}

export interface IUser extends User {
  name: string;
}
