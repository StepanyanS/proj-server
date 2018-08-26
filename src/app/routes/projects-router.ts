// import absract classes
import { Routing } from './routing';

// import middlewares
import { mypassport } from '../middleware/passport';

// import controllers
import { projectsController } from './../projects/index';

/**
 * @description Projects router instance
 * @export
 * @class ProjectsRouter
 * @extends {Routing}
 */
export class ProjectsRouter extends Routing {
  
  /**
   * @description Creates an instance of ProjectsRouter
   * @memberof ProjectsRouter
   */
  constructor() {
    super();
  }

  
  /**
   * @description Adds 'projects' routes and controllers
   * @memberof ProjectsRouter
   */
  route(): void {

    this.router.post('/create',  mypassport.authenticate('jwt', { session: false }), projectsController.createProject.bind(projectsController));     // Create

    this.router.get('/download', mypassport.authenticate('jwt', { session: false }), projectsController.downloadProject.bind(projectsController));   // Read
  }
}