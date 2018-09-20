import { EntitySchema } from 'typeorm';
import { IProject } from '../models/project';
import { BaseService } from '../shared/base.service';
import { IResult } from './../models/result.d';
import { remove } from '../utils/utils';
import { GenerateProject } from './generate-project';
import { PROJECT_CONFIG } from './projects.config';
import { readFileSync } from 'fs';

export class ProjectsService extends BaseService<IProject> {
  private generateProject: GenerateProject;

  constructor(projectEntity: EntitySchema<IProject>) {
    super(projectEntity);
    this.generateProject = new GenerateProject();
  }

  async createProject(project: IProject, userId: number): Promise<IResult> {

    const colorsSources = {
      primary: 'red',
      secondary: 'black'
    };

    const existingProject = await this.getAll({user: userId, projectName: project.projectName});
    if(existingProject && existingProject.length > 0) return this.getResult(422, null, false, 'Project with this name is already exists');
    project.user = userId;
    project.date = new Date();
    project.data.colorsSources = colorsSources;
    await this.generateProject.generate(userId, project.projectName, project.data);
    const result = await this.addItem(project);
    if(result) {
      const data = {
        id: result.id,
        projectName: result.projectName,
        date: result.date
      }
      return this.getResult(201, null, true, 'Project has been successfully created', data);
    }
    return this.getResult(502, null, false, 'Something went wrong');
  }

  async getProject(userId, projectId: number) {
    const project = await this.getById(projectId);
    const projectPath = `${PROJECT_CONFIG.NEW_PROJECT_DIR}/${userId}/${project.projectName}.zip`;
    return this.getResult(200, null, true, '', projectPath);
  }

  async getProjects(userId: number): Promise<IResult> {
    const projects = await this.getAll({user: userId});
    if(projects) {
      const result = projects.map(project => {
        return {
          id: project.id,
          projectName: project.projectName,
          date: project.date
        }
      });
      return this.getResult(200, null, true, '', result);
    }
    return this.getResult(200, null, true, '');
  }

  async removeProject(userId: number, projectId: number): Promise<IResult> {
    const project = await this.getById(projectId);
    if(project) {
      await remove(userId, `${project.projectName}.zip`);
      const result = await this.removeItem(projectId);
      if(result.raw.affectedRows) return this.getResult(202, null, true, 'Project has been removed');
    }
    return this.getResult(404, null, false, 'Project does not exist');
  }
}