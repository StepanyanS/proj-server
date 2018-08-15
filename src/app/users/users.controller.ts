// import models
import { IUser } from "../models/user";
import { IRest } from "../models/rest";

// import modules
import { Request, Response } from 'express';

const usersArray: IUser[] = [
  {
    email: 'sasun-07@mail.ru',
    password: '123456',
    name: 'Sasun',
    id: 1
  }
];

export class UsersController implements IRest {


  /**
   * @description gets user by email
   * @param {string} email user email
   * @param {IUser[]} users users array
   * @returns {IUser}
   * @memberof Users
   */
  getUserByEmail(email: string, users: IUser[]): IUser {
    return users.find(user => user.email === email);
  }

  getUser(req: Request, res: Response): void {
    res.send(
      this.getUserByEmail(req.query['email'], usersArray)
    );
    console.log(this.getUserByEmail(req.query['email'], usersArray));
  }


  /**
   * @description gets all users
   * @returns {IUser[]}
   * @memberof Users
   */
  getUsers(): IUser[] {
    return usersArray;
  }


  /**
   * @description adds user in users array
   * @param {IUser} user user
   * @param {IUser[]} users users array
   * @memberof Users
   */
  addUserByEmail(user: IUser): void {
    user.id = usersArray[usersArray.length - 1].id + 1;
    usersArray.push(user);
  }

  addUser(req: Request, res: Response): void {
    this.addUserByEmail(req.body);
    console.log(this.getUsers());
    res.status(201).send(req.body);
  }

  
  /**
   * @description edits user
   * @param {IUser} user user
   * @param {IUser[]} users users array
   * @memberof Users
   */
  editUserByEmail(user: IUser): void {
    Object.assign(this.getUserByEmail(user.email, usersArray), user);
    console.log(this.getUserByEmail(user.email, usersArray));
  }

  editUser(req: Request, res: Response): void {
    this.editUserByEmail(req.body);
    console.log(this.getUsers());
    res.status(201).send(req.body);
  }
}