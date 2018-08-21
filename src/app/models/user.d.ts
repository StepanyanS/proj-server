export interface IUser {
  readonly email: string;
  password: string;
  name: string;
  id?: number;
  editedPassword?: string
}
