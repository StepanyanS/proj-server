// import modules
import { Router } from 'express';

/**
 * @description Abstract class for Routes
 * @export
 * @abstract
 * @class Routing
 */
export abstract class Routing {
  router: Router;

  /**
   * @description Creates an instance of Routing
   * @memberof Routing
   */
  protected constructor() {
    this.router = Router();
    this.route();
  }

  /**
   * @description Abstract method for adding routes and controllers
   * @abstract
   * @memberof Routing
   */
  abstract route(): void;
}