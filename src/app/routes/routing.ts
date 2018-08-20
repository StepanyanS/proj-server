import { Router } from 'express';

export abstract class Routing {
  router: Router;

  protected constructor() {
    this.router = Router();
    this.route();
  }

  abstract route(): void;
}