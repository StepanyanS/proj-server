import { Router } from 'express';
import { UsersRouter } from './users-router';
import { IRouting } from '../models/routing';

const usersrouter = new UsersRouter();

export class Routes implements IRouting {
  
  router: Router;

  constructor() {
    this.router = Router();
    this.route();
  }

  route(): void {
    this.router.get('/', () => {}).use('/users/', usersrouter.router);
  }
}