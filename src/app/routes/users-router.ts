import { Routing } from './routing';

import { PassportMiddleWare } from '../middleware/passport';
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

    this.router.get('/check/', this.usersController.findByEmail.bind(this.usersController));

    this.router.post('/',      this.usersController.addUser.bind(this.usersController));                                                                         // Create

    this.router.get('/',       PassportMiddleWare.passport.authenticate('jwt', { session: false }), this.usersController.getUser.bind(this.usersController));    // Read

    this.router.put('/',       PassportMiddleWare.passport.authenticate('jwt', { session: false }), this.usersController.editUser.bind(this.usersController));   // Update

    this.router.delete('/',    PassportMiddleWare.passport.authenticate('jwt', { session: false }), this.usersController.removeUser.bind(this.usersController)); // Delete

    this.router.post('/login', this.usersController.login.bind(this.usersController));                                                                           // Login
    
  }
}