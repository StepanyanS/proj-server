// import modules
import { Request, Response } from 'express';

// import providers
import { UsersService } from "./users.service";

// import models
import { User } from './../models/user.d';
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


  /**
   * @description Request handler for POST
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   * @memberof UsersController
   */
  async addUser(req: Request, res: Response): Promise<void> {
    try {
      const result: IError | boolean = await this.usersService.addUser(req.body);
      if(!result) res.status(502).send(result);
      else if(typeof result !== 'boolean') {
        res.status(result.statusCode).send(result);
      }
      else {
        res.status(201).send(true);
      }
    }
    catch(err) {
      res.status(502).send({
        type: 'Bad Gateway',
        statusCode: 502,
        message: 'Something went wrong'
      });
    }
  }


  /**
   * @description Request handler for GET
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   * @memberof UsersController
   */
  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const result: IError | User = await this.usersService.getUser(req.user);
      if(result instanceof User) {
        res.status(201).send(result)
      }
      else {
        res.status(result.statusCode).send(result.message);
      }
    }
    catch(err) {
      res.status(502).send({
        type: 'Bad Gateway',
        statusCode: 502,
        message: 'Something went wrong'
      });
    }
  }


  /**
   * @description Request handler for PUT
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   * @memberof UsersController
   */
  async editUser(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.usersService.editUser(req.body, req.user);
      if(result instanceof User) res.status(201).send(result);
      else res.status(result.statusCode).send(result);
    }
    catch(err) {
      res.status(502).send({
        type: 'Bad Gateway',
        statusCode: 502,
        message: 'Something went wrong'
      });
    }
  }

  
  /**
   * @description Request handler for DELETE
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   * @memberof UsersController
   */
  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const result: boolean | IError = await this.usersService.deleteUser(req.user);
      if(typeof result === 'boolean') {
        res.status(201).send(result);
      }
      else {
        res.status(result.statusCode).send(result.message);
      }
    }
    catch(error) {
      res.status(502).send({
        type: 'Bad Gateway',
        statusCode: 502,
        message: 'Something went wrong'
      });
    }
  }


  /**
   * @description Request handler for Login
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   * @memberof UsersController
   */
  async login(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.usersService.login(req.body);
      if(typeof result !== 'string') {
        res.status(result.statusCode).send(result);
      }
      else {
        res.status(201).send({
          token: result
        });
      }
    }
    catch(err) {
      res.status(502).send({
        type: 'Bad Gateway',
        statusCode: 502,
        message: 'Something went wrong'
      });
    }
  }
  
}