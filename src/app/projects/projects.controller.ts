import { Request, Response } from 'express';
import { ProjectsService } from './projects.service';
import { newProjectDir } from './projects.config';
import { ProjectEntity } from '../entities/project.entity';

export class ProjectsController {
  projectsService: ProjectsService;

  constructor () {
    this.projectsService = new ProjectsService(ProjectEntity);
  }

  public async createProject(req: Request, res: Response): Promise<void> {
    const result = await this.projectsService.createProject(req.body, req.user);
    if(result) res.status(201).send(result);
    else {
      res.status(502).send('Bad Gateway');
    }
  }

  async getProjects(req: Request, res: Response): Promise<void> {
    const result = await this.projectsService.getProjects(req.user);
    if(result) res.status(200).send(result);
    else {
      res.status(502).send('Bad Gateway');
    }
  }

  async removeProject(req: Request, res: Response): Promise<void> {
    const result = await this.projectsService.removeProject(req.user, req.params.id);
    if(result) res.status(200).send(result);
    else {
      res.status(502).send('Bad Gateway');
    }
  }

  public async downloadProject(req: Request, res: Response) {
    const file = `${newProjectDir}/${req.user}/${req.query.projectName}.zip`;
    res.download(file);
    console.log('Downloaded');
  }

}