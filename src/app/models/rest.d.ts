import { IUser } from './user';
import { IError } from './error';
import { UserFromServer } from '../users/users.service';

export interface IRest {
  addUser(user: IUser): Promise<boolean | IError>;
  getUser(id: number): Promise<IError | UserFromServer>;
  editUser(user: IUser, id: number): Promise<UserFromServer | IError>;
  deleteUser(id: number): Promise<IError | boolean>;
}
