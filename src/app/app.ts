// import modules
import * as express from 'express';
import * as cors from 'cors';
import { json } from 'body-parser';

// import routes
import { Routes } from './routes/index';

// import moddlewares
import { passportMiddleware } from './middleware/passport';

/**
 * @description Express application instance
 * @export
 * @class App
 */
export class App {
  routes: Routes;
  expressApp: express.Express;
  corsOptions: cors.CorsOptions;

  
  /**
   * @description Creates an instance of App
   * @memberof App
   */
  constructor() {
    this.routes = new Routes();
  }

  
  /**
   * @description Boostrapping Express application
   * @memberof App
   */
  bootstrap(): void {

    this.expressApp = express();

    this.corsOptions = {
      optionsSuccessStatus: 200
    };

    this.expressApp.use(cors(this.corsOptions));
    this.expressApp.use(json());
    this.expressApp.use(passportMiddleware.passport.initialize());

    this.expressApp.use('/api', this.routes.router);

    this.expressApp.listen(3000, (): void => {
      console.log('Server started!');
    });
  }
};