import { Request, Response } from 'express';
import { ProjectsService } from './projects.service';

import { newProjectDir } from './projects.config';


/**
 * @description ProjectsController instance
 * @export
 * @class ProjectsController
 */
export class ProjectsController {


  /**
   * @description Creates an instance of ProjectsController.
   * @param {ProjectsService} projectsService
   * @memberof ProjectsController
   */
  constructor (
    private projectsService: ProjectsService
  ) {}


  /**
   * @description creates project by provider
   * @param {Request} req
   * @param {Response} res
   * @memberof ProjectsController
   */
  public createProject(req: Request, res: Response): void {
    this.projectsService.createProject(req.body).then((isCreated) => {
      res.status(201).send(isCreated);
    });
  }


  /**
   * @description downloads project
   * @param {Request} req
   * @param {Response} res
   * @memberof ProjectsController
   */
  public downloadProject(req: Request, res: Response) {
    const file = `${newProjectDir}/${req.query.projectName}.zip`;
    res.download(file);
    console.log('Downloaded');
  }

}