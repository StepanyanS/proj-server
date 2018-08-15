import { IUser } from './user';

export interface IRest {
  getUser(email: string): IUser;
  getUsers(): IUser[] | undefined;
  addUser(user: IUser): void;
  editUser(user: IUser): void;
}
