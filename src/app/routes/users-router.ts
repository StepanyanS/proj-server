import { Routing } from './routing';

import { passportMiddleware } from '../middleware/passport';
import { UsersController } from './../users/users.controller';

export class UsersRouter extends Routing {
  usersController: UsersController;

  constructor () {
    super();
  }

  init(): void {
    this.usersController = new UsersController();
  }

  route(): void {

    this.router.post('/',         this.usersController.addUser.bind(this.usersController));    // Create

    this.router.get('/',          this.usersController.getUser.bind(this.usersController));    // Read

    // this.router.put('/',       passportMiddleware.passport.authenticate('jwt', { session: false }), usersController.editUser.bind(usersController));   // Update

    // this.router.delete('/',    passportMiddleware.passport.authenticate('jwt', { session: false }), usersController.deleteUser.bind(usersController)); // Delete

    // this.router.post('/login', usersController.login.bind(usersController));                                                                           // Login
    
  }
}