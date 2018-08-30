import { Request, Response } from 'express';
import { ProjectsService } from './projects.service';
import { newProjectDir } from './projects.config';
import { ProjectEntity } from '../entities/project.entity';

export class ProjectsController {
  projectsService: ProjectsService;

  constructor () {
    this.projectsService = new ProjectsService(ProjectEntity);
  }

  public createProject(req: Request, res: Response): void {
    this.projectsService.createProject(req.body, req.user).then((isCreated) => {
      res.status(201).send(isCreated);
    });
  }

  public downloadProject(req: Request, res: Response) {
    const file = `${newProjectDir}/${req.user}/${req.query.projectName}.zip`;
    res.download(file);
    console.log('Downloaded');
  }

}