import { createWriteStream, WriteStream } from 'fs';
import { copy as fseCopy, remove as fseRemove } from 'fs-extra';
import { resolve } from 'path';
import { Archiver, create as createArchive, ArchiverOptions } from 'archiver';
import { EntitySchema } from 'typeorm';
import { GenerateVariables } from './generate-variables';
import { IProject } from '../models/project';
import { mainProjectDir, newProjectDir } from './projects.config';
import { BaseService } from '../shared/base.service';

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
      console.log('Copied!');
    } catch (err) {
      console.error(err);
    }
  }

  private async writeVariablesData(variablesFile: string, data: string): Promise<void> {
    try {
      const wrStream: WriteStream = createWriteStream(variablesFile);
      await wrStream.write(data);
      wrStream.close();
      console.log('Variables written!');
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
          await fseRemove(this.getNewProjectDir(id, projectName));
          resolve(true);
        }
        catch(err) {
          console.log(err);
        }
      });
      archive.on('error', (err) => reject(err));
    })
  }

  async createProject(project, userId: number): Promise<boolean> {

    const colorsSources = {
      primary: 'red',
      secondary: 'black'
    };

    try {
      project.userId = userId;
      project.date = new Date();
      await this.copyProject(userId, project.projectName);
      await this.writeVariablesData(this.getVariablesFilePath(userId, project.projectName, 'variables'), this.generateVariables.getColorsData(project.data.colors, colorsSources));
      await this.makeZip(userId, project.projectName);
      const res = await this.addItem(project);
      return res ? true : false;
    }
    catch(err) {
      console.log(err);
      return false;
    }
  }
}