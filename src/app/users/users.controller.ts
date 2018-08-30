import { Request, Response } from 'express';

import { UsersService } from "./users.service";

import { IError } from './../models/error.d';

import { UserEntity } from "../entities/user.entity";

export class UsersController {
  usersService: UsersService;

  constructor() {
    this.usersService = new UsersService(UserEntity);
  }

  async addUser(req: Request, res: Response): Promise<void> {
    const result = await this.usersService.addUser(req.body);
    if(result) res.status(201).send(result);
    else {
      res.status(502).send(result);
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    const result = await this.usersService.getUser(5);
    if(result) res.status(201).send(result);
    else {
      res.status(502).send('Bad Gateway');
    }
  }

  async editUser(req: Request, res: Response): Promise<void> {
    const result = await this.usersService.editUser(req.user, req.body);
    if(result) res.status(201).send(result);
    else {
      res.status(502).send(result);
    }
  }
  
}