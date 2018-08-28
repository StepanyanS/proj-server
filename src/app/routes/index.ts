// import abstract classes
import { Routing } from './routing';

// import routers
import { UsersRouter } from './users-router';
import { ProjectsRouter } from './projects-router';

const usersrouter = new UsersRouter();
const projectsRouter = new ProjectsRouter();

/**
 * @description Routes instance
 * @export
 * @class Routes
 * @extends {Routing}
 */
export class Routes extends Routing {

  /**
   * @description Creates an instance of Routes
   * @memberof Routes
   */
  constructor() {
    super();
  }

  
  /**
   * @description Adds main routes
   * @memberof Routes
   */
  route(): void {

    this.router.use('/users/', usersrouter.router);

    this.router.use('/projects/', projectsRouter.router);
  }
}