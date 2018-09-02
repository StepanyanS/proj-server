import { IUser } from './user.d';
import { IError } from './error';

export interface IRest {
  addUser(user: IUser): Promise<boolean | IError>;
  getUser(id: number): Promise<IError | any>;
  editUser(user: IUser, id: number): Promise<any>;
  deleteUser(id: number): Promise<IError | boolean>;
}
