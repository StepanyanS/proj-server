import { IUser } from './user';

export interface IRest {
  getUserByEmail(email: string, users: IUser[]): IUser;
  getUsers(users: IUser[]): IUser[] | undefined;
  addUser(user: IUser): void;
  editUser(user: IUser, users: IUser[]): void;
}
