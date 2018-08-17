import { createWriteStream } from 'fs';
import * as fse from 'fs-extra';
import * as archiver from 'archiver';
import { resolve } from 'path';

// import models
import { IProject } from '../models/project';


import { mainProjectDir } from './projects.config';
import { newProjectDir } from './projects.config';

export class ProjectsService {
  
  private getNewProjectDir(name: string): string {
    return resolve(__dirname, newProjectDir, name);
  }

  async copyProject(projectName: string): Promise<void> {
    try {
      await fse.copy(mainProjectDir, this.getNewProjectDir(projectName));
      console.log('Copied!');
    } catch (err) {
      console.error(err);
    }
  }

  private async makeZip(projectName: string): Promise<boolean> {
    try {
      const output: any = createWriteStream(`${newProjectDir}/${projectName}.zip`);
      const archive: any = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
      });

      output.on('close', () => {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
      });

      // This event is fired when the data source is drained no matter what was the data source.
      // It is not part of this library but rather from the NodeJS Stream API.
      // @see: https://nodejs.org/api/stream.html#stream_event_end
      output.on('end', () => {
        console.log('Data has been drained');
      });

      // good practice to catch warnings (ie stat failures and other non-blocking errors)
      archive.on('warning', err => {
        if (err.code === 'ENOENT') {
          // log warning
        } else {
          // throw error
          throw err;
        }
      });

      // good practice to catch this error explicitly
      archive.on('error', err => {
        throw err;
      });

      // pipe archive data to the file
      archive.pipe(output);

      // append a file from stream
      const project: string = this.getNewProjectDir(projectName);

      // append files from a sub-directory, putting its contents at the root of archive
      archive.directory(project, false);

      // finalize the archive (ie we are done appending files but streams have to finish yet)
      // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
      archive.finalize();

      // resolve(true);
      return true;
    } catch (error) {
      console.log(error);
      return false
    }
  }

  async createProject(project: IProject): Promise<boolean> {
    try {
      await this.copyProject(project.name);
      // await writeStyles(getVariablesFilePath(project.name), writeData.getWriteData(project.colors, colorsSources));
      return this.makeZip(project.name).then(res => res);
    } catch(error) {
      console.log(error);
    }
  }
}