import { Routing } from './routing';

// import constrollers
import { usersController } from './../users/index';

export class UsersRouter extends Routing {

  constructor () {
    super();
  }

  route(): void {
    this.router.get('/', usersController.getUser.bind(usersController));

    this.router.put('/', usersController.editUser.bind(usersController));
    
    this.router.post('/', usersController.addUser.bind(usersController));
  }
}