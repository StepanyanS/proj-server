import { Routing } from './routing';
import { projectsController } from './../projects/index';

export class ProjectsRouter extends Routing {
  constructor() {
    super();
  }

  route(): void {
    this.router.post('/create', projectsController.createProject.bind(projectsController));

    this.router.get('/download', projectsController.downloadProject.bind(projectsController));
  }
}