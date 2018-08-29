import { Router } from 'express';

export abstract class Routing {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
    this.route();
  }

  abstract route(): void;

  abstract init(): void;
}