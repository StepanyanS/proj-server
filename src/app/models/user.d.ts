import { IProject } from './project';

export interface IUser {
  readonly id: number;
  readonly email: string;
  password: string;
  newPassword?: string;
  userName: string;
  projects?: IProject[];
}