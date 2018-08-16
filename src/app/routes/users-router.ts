import { Routing } from './routes';

// import constrollers
import { usersController } from './../users/index';

export class UsersRouter extends Routing {

  constructor () {
    super();
    this.route();
  }

  route(): void {
    this.router.get('/', usersController.getUser.bind(usersController));

    this.router.put('/', usersController.editUser.bind(usersController));
    
    this.router.post('/', usersController.addUser.bind(usersController));
  }
}