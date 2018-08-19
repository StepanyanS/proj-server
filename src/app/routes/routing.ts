import { Router } from 'express';

export abstract class Routing {
  protected router: Router;

  protected constructor() {
    this.router = Router();
    this.route();
  }

  abstract route(): void;
}