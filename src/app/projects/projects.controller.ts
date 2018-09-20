import { Request, Response } from 'express';
import { ProjectsService } from './projects.service';
import { PROJECT_CONFIG } from './projects.config';
import { ProjectEntity } from '../entities/project.entity';
import { BaseController } from '../shared/base.controller';

export class ProjectsController extends BaseController<ProjectsService> {

  constructor () {
    super(new ProjectsService(ProjectEntity));
  }

  public async createProject(req: Request, res: Response): Promise<void> {
    await this.handle(this.service.createProject(req.body, req.user), res);
  }

  public async getProjects(req: Request, res: Response): Promise<void> {
    await this.handle(this.service.getProjects(req.user), res);
  }

  public async removeProject(req: Request, res: Response): Promise<void> {
    await this.handle(this.service.removeProject(req.user, +req.params.id), res);
  }

  public async downloadProject(req: Request, res: Response): Promise<void> {
    await this.handle(this.service.getProject(req.user, +req.params.id), res, 'download');
  }

}