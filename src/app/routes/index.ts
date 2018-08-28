// import abstract classes
import { Routing } from './routing';

// import routers
import { UsersRouter } from './users-router';
import { ProjectsRouter } from './projects-router';

const usersrouter = new UsersRouter();
const projectsRouter = new ProjectsRouter();

export class Routes extends Routing {

  constructor() {
    super();
  }

  route(): void {

    this.router.use('/users/', usersrouter.router);

    this.router.use('/projects/', projectsRouter.router);
  }
}