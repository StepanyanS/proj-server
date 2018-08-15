// import models
import { IUser } from "../models/user";
import { IRest } from "../models/rest";

export class Users implements IRest {

  getUser(email: string, users: IUser[]): IUser {
    return <IUser>users.find(user => user.email === email);
  }

  getUsers(users: IUser[]): IUser[] {
    return users;
  }

  addUser(user: IUser, users: IUser[]): void {
    const id: number = users[users.length - 1].id + 1;
    user.id = id;
    users.push(user);
  }

  editUser(user: IUser, users: IUser[]): void {
    Object.assign(this.getUser(user.email, users), user);
    console.log(this.getUser(user.email, users));
  }
}