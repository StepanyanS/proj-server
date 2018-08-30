import { Routing } from './routing';

import { UsersRouter } from './users-router';
// import { ProjectsRouter } from './projects-router';

// const projectsRouter = new ProjectsRouter();

export class Routes extends Routing {
  usersrouter: UsersRouter;

  constructor() {
    super();
  }

  init(): void {
    this.usersrouter = new UsersRouter();
  }

  route(): void {

    this.router.use('/users/', this.usersrouter.router);

    // this.router.use('/projects/', projectsRouter.router);
  }
}