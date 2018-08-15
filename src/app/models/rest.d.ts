import { IUser } from './user';

export interface IRest {
  getUserByEmail(email: string, users: IUser[]): IUser;
  getUsers(users: IUser[]): IUser[] | undefined;
  addUserByEmail(user: IUser): void;
  editUserByEmail(user: IUser, users: IUser[]): void;
}
