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
    .then((result) => {
      result ? res.send(result) : res.status(401).send(result);
    })
    .catch(error => res.status(401).send(false));
  }

  
  /**
   * @description adds User by provider
   * @param {Request} req
   * @param {Response} res
   * @memberof UsersController
   */
  addUser(req: Request, res: Response): void {
    this.usersService.addUser(req.body)
    .then((user: IUser | false) => res.status(201).send(user))
    .catch(error => res.status(401).send(false));
  }


  /**
   * @description edits User by provider
   * @param {Request} req
   * @param {Response} res
   * @memberof UsersController
   */
  editUser(req: Request, res: Response): void {
    this.usersService.editUser(req.body)
    .then((result: IUser | false) => {
      result ? res.status(201).send(result) : res.status(401).send(result);
    })
    .catch(error => console.log(error));
  }
  
}