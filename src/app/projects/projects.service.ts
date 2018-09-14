import { createWriteStream, WriteStream } from 'fs';
import { copy as fseCopy } from 'fs-extra';
import { resolve } from 'path';
import { Archiver, create as createArchive, ArchiverOptions } from 'archiver';
import { EntitySchema } from 'typeorm';
import { GenerateVariables } from './generate-variables';
import { IProject } from '../models/project';
import { mainProjectDir, newProjectDir } from './projects.config';
import { BaseService } from '../shared/base.service';
import { IResult } from './../models/result.d';
import { remove } from '../utils/utils';

export class ProjectsService extends BaseService<IProject> {
  generateVariables: GenerateVariables;
  
  constructor(projectEntity: EntitySchema<IProject>) {
    super(projectEntity);
    this.generateVariables = new GenerateVariables();
  }
  
  private getNewProjectDir(id: number, name: string): string {
    return resolve(__dirname, newProjectDir, id.toString(), name);
  }

  private getVariablesFilePath(id: number, projectName: string, SassFile): string {
    return resolve(__dirname, `../../assets/deliver/${id}/${projectName}/src/assets/scss/utilities/_${SassFile}.scss`);
  }

  private async copyProject(id: number, projectName: string): Promise<void> {
    try {
      await fseCopy(mainProjectDir, this.getNewProjectDir(id, projectName));
    } catch (err) {
      console.error(err);
    }
  }

  private async writeVariablesData(variablesFile: string, data: string): Promise<void> {
    try {
      const wrStream: WriteStream = createWriteStream(variablesFile);
      await wrStream.write(data);
      wrStream.close();
    } catch (err) {
      console.error(err);
    }
  }

  private makeZip(id: number, projectName: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const archiverOptions: ArchiverOptions = {
        zlib: { level: 9 }
      }
  
      const archive: Archiver = createArchive('zip', archiverOptions);
      const output: WriteStream = createWriteStream(`${newProjectDir}/${id}/${projectName}.zip`);
      const project: string = this.getNewProjectDir(id, projectName);
  
      archive.pipe(output);
      archive.directory(project, false);
      archive.finalize();
      
      output.on('end', () => {
        console.log('Data has been drained');
      });
  
      archive.on('warning', err => {
        if (err.code === 'ENOENT') {
          console.log(err);
        } else {
          throw err;
        }
      });
  
      output.on('close', async () => {
        try {
          await remove(id, projectName);
          resolve(true);
        }
        catch(err) {
          console.log(err);
        }
      });
      archive.on('error', (err) => reject(err));
    })
  }

  async createProject(project: IProject, userId: number): Promise<IResult> {

    const colorsSources = {
      primary: 'red',
      secondary: 'black'
    };

    const existingProject = await this.getAll({user: userId, projectName: project.projectName});
    if(existingProject && existingProject.length > 0) return this.getResult(422, false, 'Project with this name is already exists');
    project.user = userId;
    project.date = new Date();
    await this.copyProject(userId, project.projectName);
    await this.writeVariablesData(this.getVariablesFilePath(userId, project.projectName, 'variables'), this.generateVariables.getColorsData(project.data.colors, colorsSources));
    await this.makeZip(userId, project.projectName);
    const result = await this.addItem(project);
    if(result) {
      const data = {
        id: result.id,
        projectName: result.projectName,
        date: result.date
      }
      this.getResult(201, true, 'Project has been successfully created', data);
    }
    return this.getResult(502, false, 'Something went wrong');
  }

  getProject() {

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
      return this.getResult(200, true, '', result);
    }
    return this.getResult(200, true, '');
  }

  async removeProject(userId: number, projectId: number): Promise<IResult> {
    const project = await this.getById(projectId);
    if(project) {
      await remove(userId, `${project.projectName}.zip`);
      const result = await this.removeItem(projectId);
      if(result.raw.affectedRows) return this.getResult(202, true, 'Project has been removed');
    }
    return this.getResult(404, false, 'Project does not exist');
  }
}