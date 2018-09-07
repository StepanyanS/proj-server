import { IProject } from './project';

export interface IUser {
  readonly id: number;
  readonly email: string;
  password: string;
  userName: string;
  projects?: IProject[];
}