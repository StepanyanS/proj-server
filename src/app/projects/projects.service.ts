// import modules
import { createWriteStream, WriteStream } from 'fs';
import * as fse from 'fs-extra';
import { resolve } from 'path';
import * as archiver from 'archiver';

import { GenerateVariables } from './generate-variables';

// import models
import { IProject } from '../models/project';

// import configs
import { mainProjectDir, newProjectDir } from './projects.config';

export class ProjectsService {
  
  constructor(
    private generateVariables: GenerateVariables
  ) {}
  
  private getNewProjectDir(name: string): string {
    return resolve(__dirname, newProjectDir, name);
  }

  private getVariablesFilePath(projectName: string, SassFile): string {
    return resolve(__dirname, `../../assets/deliver/${projectName}/src/assets/scss/utilities/_${SassFile}.scss`);
  }

  private async copyProject(projectName: string): Promise<void> {
    try {
      await fse.copy(mainProjectDir, this.getNewProjectDir(projectName));
      console.log('Copied!');
    } catch (err) {
      console.error(err);
    }
  }

  private makeZip(projectName: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const archiverOptions = {
        zlib: { level: 9 }
      }
  
      const archive = archiver('zip', archiverOptions);
      const output: WriteStream = createWriteStream(`${newProjectDir}/${projectName}.zip`);
      const project: string = this.getNewProjectDir(projectName);
  
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
  
      output.on('close', () => resolve(true));
      archive.on('error', (err) => reject(err));
    })
  }

  private async writeStyles(variablesFile: string, data: string): Promise<void> {
    try {
      const wrStream: WriteStream = createWriteStream(variablesFile);
      await wrStream.write(data);
      console.log('Variables written!');
    } catch (err) {
      console.error(err);
    }
  }

  async createProject(project: IProject): Promise<boolean> {

    const colorsSources = {
      primary: 'red',
      secondary: 'black'
    };

    try {
      await this.copyProject(project.name);
      await this.writeStyles(this.getVariablesFilePath(project.name, 'variables'), this.generateVariables.getColorsData(project.colors, colorsSources));
      return this.makeZip(project.name).then(res => res)
      .then(res => res)
      .catch(error => error);
    } catch(error) {
      console.log(error);
    }
  }
}