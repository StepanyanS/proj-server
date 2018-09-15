import { Archiver, create as createArchive, ArchiverOptions } from 'archiver';
import { WriteStream, createWriteStream } from 'fs';
import { copy as fseCopy } from 'fs-extra';
import { resolve } from 'path';
import { remove } from '../utils/utils';
import { PROJECT_CONFIG } from './projects.config';
import { IProjectData, IColor } from '../models/project';

export class GenerateProject {
  private archiverOptions: ArchiverOptions;

  constructor() {
    this.archiverOptions = {
      zlib: { level: 9 }
    }
  }

  private getNewProjectDir(id: number, name: string): string {
    return resolve(__dirname, PROJECT_CONFIG.NEW_PROJECT_DIR, id.toString(), name);
  }

  private getVariablesFilePath(id: number, projectName: string, varablesFile: string): string {
    return resolve(__dirname, PROJECT_CONFIG.NEW_PROJECT_DIR, id.toString(), projectName, `src/assets/scss/utilities/variables/_${varablesFile}.scss`);
  }

  private async copyProject(id: number, projectName: string): Promise<void> {
    try {
      await fseCopy(PROJECT_CONFIG.MAIN_PROJECT_DIR, this.getNewProjectDir(id, projectName));
    } catch (err) {
      console.error(err);
    }
  }

  private makeZip(id: number, projectName: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      
      const archive: Archiver = createArchive('zip', this.archiverOptions);
      const output: WriteStream = createWriteStream(this.getNewProjectDir(id, `${projectName}.zip`));
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

  private getColorsData(colors: IColor[], colorsSources: Object): string {
    let colorsVariablesData = '// colors\n';
    let colorsSourcesData = '// Color themes\n';

    for(let color of colors) {
      colorsVariablesData += `$color-${color.name}: ${color.value} !default;\n`;
    }
    colorsVariablesData += '\n';
    
    for(let [ key, value ] of Object.entries(colorsSources)) {
      colorsSourcesData += `$color-${key}: $color-${value} !default;\n`;
    }
    colorsSourcesData += '\n';
    
    return colorsVariablesData + colorsSourcesData;
  }

  private async writeVariablesData(variablesFile: string, data: string): Promise<void> {
    try {
      const wrStream: WriteStream = createWriteStream(variablesFile);
      await wrStream.write(data);
      wrStream.close();
    }
    catch(err) {
      console.log(err);
    }
  }

  public async generate(id: number, projectName: string, data: IProjectData) {
    await this.copyProject(id, projectName);
    await this.writeVariablesData(this.getVariablesFilePath(id, projectName, 'variables'), this.getColorsData(data.colors, data.colorsSources));
    await this.makeZip(id, projectName);
  }
}