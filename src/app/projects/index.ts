//import DB
import { Database } from '../db/db';

// import constroller
import { ProjectsController } from './projects.controller';

// import service
import { ProjectsService } from './projects.service';

import { GenerateVariables } from './generate-variables';

const generateVariables = new GenerateVariables();
const db = new Database();
const projectsService = new ProjectsService(db, generateVariables);

export const projectsController = new ProjectsController(projectsService);