import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as path from 'path';

import { Routes } from './routes/index';

export class App {
  routes;

  constructor() {
    this.routes = new Routes();
  }

  bootstrap() {
    const app = express();
    
    const corsOptions = {
      origin: 'http://localhost:4200',
      optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    };

    app.use(cors(corsOptions));
    app.use(bodyParser.json());

    app.use('/api', this.routes.router);

    app.listen(3000, () => {
      console.log('Server started!');
    });
  }
};

import { copyProject } from "./utils/copy-project";

import { makeZip } from './utils/make-zip';

import { writeStyles } from './write-styles';

import { downloadProject } from './utils/download-project';

import { IUser } from './models/user';

import { WriteData } from './write-data/write-data';

import { IProject } from './models/project.d';

// function getVariablesFilePath(projectName: string): string {
//   return path.resolve(__dirname, `./deliver/${projectName}/src/assets/scss/utilities/_variables.scss`);
// }

// app.route('/api/create-project/').post((req, res): void => {
//   createProject(req.body).then((isCreated) => {
//     res.status(201).send(isCreated);
//   });
// });

// app.route('/api/download-project/').get(downloadProject);

// const colorsSources = {
//   primary: 'red',
//   secondary: 'black'
// };

// const writeData = new WriteData();

// async function createProject(project: IProject): Promise<boolean> {
//   try {
//     await copyProject(project.name);
//     await writeStyles(getVariablesFilePath(project.name), writeData.getWriteData(project.colors, colorsSources));
//     return makeZip(project.name).then(res => res);
//   } catch(error) {
//     console.log(error);
//   }
// }