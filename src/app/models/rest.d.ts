// import models
import { IUser } from './user.d';
import { IError } from './error';
// import { UserFromServer } from '../users/users.service';

export interface IRest {
  addUser(user: IUser): Promise<boolean | IError>;
  getUser(id: number): Promise<IError | any>;
  // editUser(user: IUser, id: number): Promise<UserFromServer | IError>;
  deleteUser(id: number): Promise<IError | boolean>;
}
