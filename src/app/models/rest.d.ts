import { IUser } from './user';
import { UserEntity } from '../entities/user.entity';

export interface IRest {
  getUserByEmail(email: string, dbConnect: boolean): Promise<UserEntity>;
  addUser(user: IUser): Promise<UserEntity>;
  editUser(user: IUser): Promise<UserEntity>;
}
