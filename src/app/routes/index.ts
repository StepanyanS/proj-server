import { Routing } from './routing';
import { UsersRouter } from './users-router';
import { ProjectsRouter } from './projects-router';

export class Routes extends Routing {
  private usersrouter: UsersRouter;
  private projectsRouter: ProjectsRouter;

  constructor() {
    super();
  }

  init(): void {
    this.usersrouter = new UsersRouter();
    this.projectsRouter = new ProjectsRouter();
  }

  route(): void {

    this.router.use('/users/', this.usersrouter.router);

    this.router.use('/projects/', this.projectsRouter.router);
  }
}