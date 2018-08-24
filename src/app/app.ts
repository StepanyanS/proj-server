import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { mypassport } from './middleware/passport';

// import routes
import { Routes } from './routes/index';

// import moddlewares
// import { PassportMiddleWare } from './middleware/passport';

export class App {
  routes: Routes;
  // passportMiddleware: PassportMiddleWare;

  constructor() {
    // this.passportMiddleware = new PassportMiddleWare(passport);
    // this.passportMiddleware.use();
    this.routes = new Routes();
  }

  bootstrap() {

    const app = express();

    const corsOptions = {
      optionsSuccessStatus: 200
    };

    app.use(cors(corsOptions));
    app.use(bodyParser.json());
    app.use(mypassport.initialize());

    app.use('/api', this.routes.router);

    app.listen(3000, () => {
      console.log('Server started!');
    });
  }
};