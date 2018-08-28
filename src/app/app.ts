import * as express from 'express';
import { Express } from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

// import routes
import { Routes } from './routes/index';

// import moddlewares
import { passportMiddleware } from './middleware/passport';

export class App {
  routes: Routes;
  expressApp: Express;

  constructor() {
    this.routes = new Routes();
  }

  bootstrap() {

    this.expressApp = express();

    const corsOptions = {
      optionsSuccessStatus: 200
    };

    this.expressApp.use(cors(corsOptions));
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(passportMiddleware.passport.initialize());

    this.expressApp.use('/api', this.routes.router);

    this.expressApp.listen(3000, () => {
      console.log('Server started!');
    });
  }
};