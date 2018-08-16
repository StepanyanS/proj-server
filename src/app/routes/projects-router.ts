import { Routing } from "./routes";
import { projectsController } from './../projects/index';

export class ProjectsRouter extends Routing {
  constructor() {
    super();
    this.route();
  }

  route(): void {
    this.router.post('/create', projectsController.createProject.bind(projectsController));

    this.router.get('/download', projectsController.downloadProject.bind(projectsController));
  }
}