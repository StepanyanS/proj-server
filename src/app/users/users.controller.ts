import { Request, Response } from 'express';
import { BaseController } from '../shared/base.controller';
import { UsersService } from "./users.service";
import { UserEntity } from "../entities/user.entity";

export class UsersController extends BaseController<UsersService> {

  constructor() {
    super(new UsersService(UserEntity));
  }

  async addUser(req: Request, res: Response): Promise<void> {
    await this.handle(this.service.addUser(req.body), res);
  }

  async getUser(req: Request, res: Response): Promise<void> {
    await this.handle(this.service.getUser(req.user), res);
  }

  async editUser(req: Request, res: Response): Promise<void> {
    await this.handle(this.service.editUser(req.user, req.body), res);
  }

  async removeUser(req: Request, res: Response): Promise<void> {
    await this.handle(this.service.removeUser(req.user), res);
  }

  async login(req: Request, res: Response): Promise<void> {
    await this.handle(this.service.login(req.body), res);
  }
  
}