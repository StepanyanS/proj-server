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
  private errorCount: number = 0;

  constructor() {
    this.expressApp = express();

    this.corsOptions = {
      optionsSuccessStatus: 200
    };
  }

  private async use(): Promise<void> {
    if(this.errorCount > 4) return;

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
      console.log(err);
      this.expressApp.use('*', (req, res) => {
        res.status(404).send('Not Found');
      });
      this.errorCount++;
      setTimeout(this.use.bind(this), 2000);
    }
  }

  public async bootstrap() {
    await this.use();
    this.expressApp.listen(3000, (): void => {
      console.log('Server started!');
    });
  }
};