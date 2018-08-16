import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { createConnection } from "typeorm";

import { Routes } from './routes/index';

export class App {
  routes: Routes;

  constructor() {
    this.routes = new Routes();
  }

  bootstrap() {

    createConnection().then(async connection => {

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
    }).catch(error => console.log("TypeORM connection error: ", error));
  }
};

import { writeStyles } from './write-styles';

import { WriteData } from './write-data/write-data';

// function getVariablesFilePath(projectName: string): string {
//   return path.resolve(__dirname, `./deliver/${projectName}/src/assets/scss/utilities/_variables.scss`);
// }

// const colorsSources = {
//   primary: 'red',
//   secondary: 'black'
// };

// const writeData = new WriteData();