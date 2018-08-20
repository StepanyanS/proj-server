// import modules
import { Request, Response } from 'express';

// import providers
import { UsersService } from "./users.service";

// import models
import { IUser } from './../models/user.d';

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

  
  /**
   * @description gets User by provider 
   * @param {Request} req
   * @param {Response} res
   * @memberof UsersController
   */
  getUser(req: Request, res: Response): void {
    this.usersService.getUserByEmail(req.query['email'])
    .then((user) => {
      console.log(user);
      res.send(user)
    })
    .catch(error => res.send(false));
  }

  
  /**
   * @description adds User by provider
   * @param {Request} req
   * @param {Response} res
   * @memberof UsersController
   */
  addUser(req: Request, res: Response): void {
    this.usersService.addUser(req.body)
    .then((user: IUser) => res.status(201).send(user))
    .catch(error => console.log(error));
  }


  /**
   * @description edits User by provider
   * @param {Request} req
   * @param {Response} res
   * @memberof UsersController
   */
  editUser(req: Request, res: Response): void {
    // this.usersService.editUser(req.body)
    // .then((user: IUser) => res.status(201).send(user))
    // .catch(error => console.log(error));
  }
  
}