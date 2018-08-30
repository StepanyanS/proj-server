import * as express from 'express';
import * as cors from 'cors';
import { json } from 'body-parser';
import { Routes } from './routes/index';
import { Database } from "./db/database";
import { PassportMiddleWare } from './middleware/passport';

export class App {
  private routes: Routes;
  private expressApp: express.Express;
  private corsOptions: cors.CorsOptions;

  constructor() {}

  async bootstrap() {

    this.expressApp = express();

    this.corsOptions = {
      optionsSuccessStatus: 200
    };

    this.expressApp.use(cors(this.corsOptions));
    this.expressApp.use(json());

    try {
      await Database.connect();
      PassportMiddleWare.useStrategy();
      this.expressApp.use(PassportMiddleWare.passport.initialize());
      this.routes = new Routes();
      this.expressApp.use('/api', this.routes.router);
    }
    catch(err) {
      this.expressApp.use('*', (req, res) => {
        res.status(502).send('Bad Gateway');
      });
    }

    this.expressApp.listen(3000, (): void => {
      console.log('Server started!');
    });
  }
};