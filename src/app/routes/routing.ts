import { Router } from 'express';

export abstract class Routing {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
    this.route();
  }

  protected abstract route(): void;

  protected abstract init(): void;
}