import * as fse from 'fs-extra';

import { mainProjectDir } from '../data/data';
import { getNewProjectDir } from './utils';

/**
 * @description Copies main project's files to deliver folder
 * @param {string} projectName project name
 * @returns {Promise<void>}
 */
export async function copyProject (projectName: string): Promise<void> {
  try {
    await fse.copy(mainProjectDir, getNewProjectDir(projectName));
    console.log('Copied!');
  } catch (err) {
    console.error(err);
  }
}