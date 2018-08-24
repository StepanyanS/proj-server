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
    .then((result: IError | boolean) => {
      if (!result) res.status(502).send(result);
      else if(typeof result !== 'boolean') {
        res.status(result.statusCode).send(result);
      }
      else {
        res.status(201).send(true);
      }
    })
    .catch(error => res.status(401).send(false));
  }

  getUser(req: Request, res: Response): void {
    console.log(req.body);
    this.usersService.getUser(req.body)
    .then((result) => {
      result ? res.send(result) : res.status(401).send(result);
    })
    .catch(error => res.status(401).send(false));
  }


  editUser(req: Request, res: Response): void {
    // this.usersService.editUser(req.body)
    // .then((result: IUser | IError) => {
    //   result ? res.status(201).send(result) : res.status(401).send(result);
    // })
    // .catch(error => console.log(error));
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const result: boolean = await this.usersService.deleteUser(req.body);
      result ? res.status(201).send(result) : res.send(result);
    }
    catch(error) {
      res.status(401).send(false);
    }
  }

  async login(req: Request, res: Response) {
    this.usersService.login(req.body)
    .then((result: string | IError | boolean) => {
      if(!result) res.status(502).send(result);
      else if(typeof result !== 'string' && typeof result !== 'boolean') {
        res.status(result.statusCode).send(result);
      }
      else {
        res.status(201).send(result);
      }
    })
  }
  
}