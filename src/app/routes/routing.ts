import { Router } from 'express';

export abstract class Routing {
  router: Router;

  constructor() {
    this.router = Router();
  }
}