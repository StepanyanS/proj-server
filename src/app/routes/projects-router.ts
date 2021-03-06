import { Routing } from './routing';
import { PassportMiddleWare } from '../middleware/passport';
import { ProjectsController } from './../projects/projects.controller';

export class ProjectsRouter extends Routing {
  private projectsController: ProjectsController;
  
  constructor() {
    super();
  }

  init() {
    this.projectsController = new ProjectsController();
  }

  
  route(): void {

    this.router.post('/',        PassportMiddleWare.passport.authenticate('jwt', { session: false }), this.projectsController.createProject.bind(this.projectsController));  // Create

    this.router.get('/',         PassportMiddleWare.passport.authenticate('jwt', { session: false }), this.projectsController.getProjects.bind(this.projectsController));    // Read

    this.router.delete('/:id',   PassportMiddleWare.passport.authenticate('jwt', { session: false }), this.projectsController.removeProject.bind(this.projectsController));  // Delete

    this.router.get('/download/:id', PassportMiddleWare.passport.authenticate('jwt', { session: false }), this.projectsController.downloadProject.bind(this.projectsController));
  }
}