export interface IUser {
  readonly email: string;
  password: string;
  name: string;
  id?: number;
  newPassword?: string
}

export abstract class User {
  email: string;
  name: string;
}