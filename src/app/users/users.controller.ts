// import providers
import { UsersService } from "./users.service";

// import modules
import { Request, Response } from 'express';

export class UsersController {

  constructor(
    private usersService: UsersService
  ) {}

  getUser(req: Request, res: Response): void {
    res.send(
      this.usersService.getUserByEmail(req.query['email'])
    );
    console.log(this.usersService.getUserByEmail(req.query['email']));
  }

  addUser(req: Request, res: Response): void {
    console.log(req.body);
    this.usersService.addUser(req.body);
    console.log(this.usersService.getUsers());
    res.status(201).send(this.usersService.getUserByEmail(req.body.email));
  }

  editUser(req: Request, res: Response): void {
    this.usersService.editUser(req.body);
    console.log(this.usersService.getUsers());
    res.status(201).send(req.body);
  }
}