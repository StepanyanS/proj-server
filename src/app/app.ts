import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

import { Routes } from './routes/index';

export class App {
  routes: Routes;

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