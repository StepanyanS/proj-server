import { ProjectsController } from './projects.controller';

import { ProjectsService } from './projects.service';

const projectsService = new ProjectsService();

export const projectsController = new ProjectsController(projectsService);