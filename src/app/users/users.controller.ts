// import modules
import { Request, Response } from 'express';

// import providers
import { UsersService, User } from "./users.service";

// import models
import { IUser,  } from './../models/user.d';
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


  async addUser(req: Request, res: Response): Promise<void> {
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


  async getUser(req: Request, res: Response): Promise<void> {
    this.usersService.getUser(req.user)
    .then((result) => {
      result ? res.status(201).send(result) : res.status(401).send(result);
    })
    .catch(error => res.status(401).send(false));
  }


  async editUser(req: Request, res: Response): Promise<void> {
    this.usersService.editUser(req.body, req.user)
    .then((result: User | IError) => {
      if(result instanceof User) res.status(201).send(result);
      else res.status(result.statusCode).send(result.message);
    })
    .catch(error => res.status(502).send({
      type: 'Bad Gateway',
      statusCode: 502,
      message: 'Something went wrong'
    }));
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


  async login(req: Request, res: Response): Promise<void> {
    this.usersService.login(req.body)
    .then((result: string | IError | boolean) => {
      if(!result) res.status(502).send(result);
      else if(typeof result !== 'string' && typeof result !== 'boolean') {
        res.status(result.statusCode).send(result);
      }
      else {
        res.status(201).send({
          token: result
        });
      }
    })
  }
  
}