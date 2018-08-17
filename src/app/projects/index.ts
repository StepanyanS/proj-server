// import constroller
import { ProjectsController } from './projects.controller';

// import service
import { ProjectsService } from './projects.service';

import { GenerateVariables } from './generate-variables';

const generateVariables = new GenerateVariables();

const projectsService = new ProjectsService(generateVariables);

export const projectsController = new ProjectsController(projectsService);