// import modules
import { Request, Response } from 'express';

// import providers
import { UsersService } from "./users.service";

// import models
import { IUser } from './../models/user.d';
import { IError } from './../models/error.d';

/**
 * @description User Controller instance
 * @export
 * @class UsersController
 */
export class UsersController {

  /**
   * @description Creates an instance of UsersController.
   * @param {UsersService} usersService
   * @memberof UsersController
   */
  constructor(
    private usersService: UsersService
  ) {}


  addUser(req: Request, res: Response): void {
    this.usersService.addUser(req.body)
    .then((result: IUser | IError) => res.status(201).send(result))
    .catch(error => res.status(401).send(false));
  }

  getUser(req: Request, res: Response): void {
    const user = {
      email: req.query['email'],
      password: req.query['password'],
      name: ''
    }
    this.usersService.getUser(user)
    .then((result) => {
      result ? res.send(result) : res.status(401).send(result);
    })
    .catch(error => res.status(401).send(false));
  }


  editUser(req: Request, res: Response): void {
    this.usersService.editUser(req.body)
    .then((result: IUser | IError) => {
      result ? res.status(201).send(result) : res.status(401).send(result);
    })
    .catch(error => console.log(error));
  }

  deleteUser(req: Request, res: Response): boolean {
    this.usersService.deleteUser(req.body)
    .then((result: boolean) => result)
    .catch(error => false);
  }
  
}