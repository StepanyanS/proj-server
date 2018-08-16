import { Routing } from './routing';

import { UsersRouter } from './users-router';
import { ProjectsRouter } from './projects-router';

const usersrouter = new UsersRouter();
const projectsRouter = new ProjectsRouter

export class Routes extends Routing {

  constructor() {
    super();
    this.route();
  }

  route(): void {
    this.router.get('/', () => {}).use('/users/', usersrouter.router);

    this.router.get('/', () => {}).use('/projects/', projectsRouter.router);
  }
}