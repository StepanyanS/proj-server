// import constroller
import { ProjectsController } from './projects.controller';

// import service
import { ProjectsService } from './projects.service';

const projectsService = new ProjectsService();

export const projectsController = new ProjectsController(projectsService);