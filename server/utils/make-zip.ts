import * as archiver from 'archiver';
import { createWriteStream } from "fs";

import { newProjectDir } from '../data/data';

import { getNewProjectDir } from './utils';;

export function makeZip(projectName: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
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
          const project: string = getNewProjectDir(projectName);

          // append files from a sub-directory, putting its contents at the root of archive
          archive.directory(project, false);

          // finalize the archive (ie we are done appending files but streams have to finish yet)
          // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
          archive.finalize();

          resolve(true);
      } catch (error) {
        reject(error);
      }
  })
}