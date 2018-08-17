// import providers
import { UsersService } from "./users.service";

// import modules
import { Request, Response } from 'express';
import { IUser } from './../models/user.d';

export class UsersController {

  constructor(
    private usersService: UsersService
  ) {}

  getUser(req: Request, res: Response): void {
    this.usersService.getUserByEmail(req.query['email'])
    .then((user: IUser) => res.send(user))
    .catch(error => console.log(error));
  }

  addUser(req: Request, res: Response): void {
    // Object.assign(this.userEntity, req.body);
    // this.usersService.addUser(this.userEntity)
    this.usersService.addUser(req.body)
    .then((user: IUser) => res.status(201).send(user))
    .catch(error => console.log(error));
  }

  editUser(req: Request, res: Response): void {
    this.usersService.editUser(req.body)
    .then((user: IUser) => res.status(201).send(user))
    .catch(error => console.log(error));
  }
}