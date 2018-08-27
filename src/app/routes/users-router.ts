// import abstract classes
import { Routing } from './routing';

// import middlewares
import { passportMiddleware } from '../middleware/passport';

// import constrollers
import { usersController } from './../users/index';

/**
 * @description Users router instance
 * @export
 * @class UsersRouter
 * @extends {Routing}
 */
export class UsersRouter extends Routing {

  /**
   * @description Creates an instance of UsersRouter
   * @memberof UsersRouter
   */
  constructor () {
    super();
  }


  /**
   * @description Adds 'users' routes and controllers
   * @memberof UsersRouter
   */
  route(): void {

    this.router.post('/',      usersController.addUser.bind(usersController));                                                                         // Create

    this.router.get('/',       passportMiddleware.passport.authenticate('jwt', { session: false }), usersController.getUser.bind(usersController));    // Read

    this.router.put('/',       passportMiddleware.passport.authenticate('jwt', { session: false }), usersController.editUser.bind(usersController));   // Update

    this.router.delete('/',    passportMiddleware.passport.authenticate('jwt', { session: false }), usersController.deleteUser.bind(usersController)); // Delete

    this.router.post('/login', usersController.login.bind(usersController));                                                                           // Login
    
  }
}