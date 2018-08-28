// import modules
import { createWriteStream, WriteStream } from 'fs';
import { copy, remove } from 'fs-extra';
import { resolve } from 'path';
import * as archiver from 'archiver';
import { Connection } from 'typeorm';

// import DB
import { Database } from '../db/db';

// import entities
import { ProjectEntity } from './../entities/project.entity';

import { GenerateVariables } from './generate-variables';

// import models
import { IProject } from '../models/project';

// import configs
import { mainProjectDir, newProjectDir } from './projects.config';

/**
 * @description Projects Controller Provider instance
 * @export
 * @class ProjectsService
 */
export class ProjectsService {
  
  /**
   * @description Creates an instance of ProjectsService
   * @param {GenerateVariables} generateVariables
   * @memberof ProjectsService
   */
  constructor(
    private db: Database,
    private generateVariables: GenerateVariables
  ) {}
  
  
  /**
   * @description Gets new project direction
   * @private
   * @param {string} name
   * @returns {string}
   * @memberof ProjectsService
   */
  private getNewProjectDir(id: number, name: string): string {
    return resolve(__dirname, newProjectDir, id.toString(), name);
  }


  /**
   * @description Gets variables file path by schematic
   * @private
   * @param {string} projectName
   * @param {*} SassFile
   * @returns {string}
   * @memberof ProjectsService
   */
  private getVariablesFilePath(id: number, projectName: string, SassFile): string {
    return resolve(__dirname, `../../assets/deliver/${id}/${projectName}/src/assets/scss/utilities/_${SassFile}.scss`);
  }

  
  /**
   * @description Copies main project for delivery
   * @private
   * @param {string} projectName
   * @returns {Promise<void>}
   * @memberof ProjectsService
   */
  private async copyProject(id: number, projectName: string): Promise<void> {
    try {
      await copy(mainProjectDir, this.getNewProjectDir(id, projectName));
      console.log('Copied!');
    } catch (err) {
      console.error(err);
    }
  }

  
  /**
   * @description Writes variables data in specified file
   * @private
   * @param {string} variablesFile
   * @param {string} data
   * @returns {Promise<void>}
   * @memberof ProjectsService
   */
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


  /**
   * @description Makes project .zip
   * @private
   * @param {string} projectName
   * @returns {Promise<boolean>}
   * @memberof ProjectsService
   */
  private makeZip(id: number, projectName: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const archiverOptions = {
        zlib: { level: 9 }
      }
  
      const archive = archiver('zip', archiverOptions);
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
          await remove(this.getNewProjectDir(id, projectName));
          resolve(true);
        }
        catch(err) {
          console.log(err);
        }
      });
      archive.on('error', (err) => reject(err));
    })
  }

  
  /**
   * @description Creates project for download
   * @param {IProject} project
   * @returns {Promise<boolean>}
   * @memberof ProjectsService
   */
  async createProject(project: IProject, userId: number): Promise<boolean> {

    const colorsSources = {
      primary: 'red',
      secondary: 'black'
    };

    try {
      await this.copyProject(userId, project.name);
      await this.writeVariablesData(this.getVariablesFilePath(userId, project.name, 'variables'), this.generateVariables.getColorsData(project.colors, colorsSources));
      return this.makeZip(userId, project.name)
      .then(res => {
        this.db.connect().then(async (connection: Connection) => {
          const projectEntity: ProjectEntity = new ProjectEntity();
          projectEntity.userId = userId;
          projectEntity.name = project.name;
          projectEntity.date = '';
          projectEntity.data = '';
          await connection.getRepository(ProjectEntity).save(projectEntity);
          await connection.close();
          console.log('DB connection is closed');
        });
        return res;
      })
      .catch(error => error);
    } catch(error) {
      console.log(error);
    }
  }
}