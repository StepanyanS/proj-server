import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

// import routes
import { Routes } from './routes/index';

// import moddlewares
import { passportMiddleware } from './middleware/passport';

export class App {
  routes: Routes;

  constructor() {
    this.routes = new Routes();
  }

  bootstrap() {

    const app = express();

    const corsOptions = {
      optionsSuccessStatus: 200
    };

    app.use(cors(corsOptions));
    app.use(bodyParser.json());
    app.use(passportMiddleware.passport.initialize());

    app.use('/api', this.routes.router);

    app.listen(3000, () => {
      console.log('Server started!');
    });
  }
};