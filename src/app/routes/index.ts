import { UsersRouter } from './users-router';
import { Routing } from './routes';

const usersrouter = new UsersRouter();

export class Routes extends Routing {

  constructor() {
    super();
    this.route();
  }

  route(): void {
    this.router.get('/', () => {}).use('/users/', usersrouter.router);
  }
}