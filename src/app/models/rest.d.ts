import { IUser } from './user';
import { UserEntity } from '../entities/user.entity';

export interface IRest {
  getUserByEmail(email: string, users: IUser[]): Promise<IUser>;
  addUser(user: IUser): Promise<UserEntity>;
  editUser(user: IUser, users: IUser[]): Promise<UserEntity>;
}
