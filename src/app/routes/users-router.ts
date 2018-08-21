import { Routing } from './routing';

// import constrollers
import { usersController } from './../users/index';

export class UsersRouter extends Routing {

  constructor () {
    super();
  }

  route(): void {

    this.router.post('/', usersController.addUser.bind(usersController));   // Create

    this.router.get('/', usersController.getUser.bind(usersController));    // Read

    this.router.put('/', usersController.editUser.bind(usersController));   // Update

    this.router.delete('/', usersController.deleteUser.bind(usersController));   // Delete
    
  }
}