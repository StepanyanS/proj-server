// import models
import { IUser } from "../models/user";
import { IRest } from "../models/rest";

export class Users implements IRest {


  /**
   * @description gets user by email
   * @param {string} email user email
   * @param {IUser[]} users users array
   * @returns {IUser}
   * @memberof Users
   */
  getUser(email: string, users: IUser[]): IUser {
    return <IUser>users.find(user => user.email === email);
  }


  /**
   * @description gets all users
   * @param {IUser[]} users users array
   * @returns {IUser[]}
   * @memberof Users
   */
  getUsers(users: IUser[]): IUser[] {
    return users;
  }


  /**
   * @description adds user in users array
   * @param {IUser} user user
   * @param {IUser[]} users users array
   * @memberof Users
   */
  addUser(user: IUser, users: IUser[]): void {
    const id: number = users[users.length - 1].id + 1;
    user.id = id;
    users.push(user);
  }

  
  /**
   * @description edits user
   * @param {IUser} user user
   * @param {IUser[]} users users array
   * @memberof Users
   */
  editUser(user: IUser, users: IUser[]): void {
    Object.assign(this.getUser(user.email, users), user);
    console.log(this.getUser(user.email, users));
  }
}