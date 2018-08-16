import { Request, Response } from 'express';
import { ProjectsService } from './projects.service';

import { newProjectDir } from './projects.config';

export class ProjectsController {

  constructor (private projectsService: ProjectsService) {}

  public createProject(req: Request, res: Response): void {
    this.projectsService.createProject(req.body).then((isCreated) => {
      res.status(201).send(isCreated);
    });
  }

  public downloadProject(req: Request, res: Response) {
    const file = `${newProjectDir}/${req.query.projectName}.zip`;
    res.download(file);
    console.log('Downloaded');
  }

}