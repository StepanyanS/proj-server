import { IUser } from './user';

export interface IRest {
  getUser(email: string, users: IUser[]): IUser;
  getUsers(users: IUser[]): IUser[] | undefined;
  addUser(user: IUser, users: IUser[]): void;
  editUser(user: IUser, users: IUser[]): void;
}
