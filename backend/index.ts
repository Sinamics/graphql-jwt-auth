import http from 'http';
import express, { Express } from 'express';
import AppConfig from './config/app.config';
import Routes from './routes';
import MiddleWare from './middleware/index';
import { createConnection, getConnectionOptions } from 'typeorm';

class Server {
  express: any;
  app: Express;
  http: any;
  port: any;
  constructor() {
    this.express = express;
    this.app = this.express();
    this.http = http.createServer(this.app);
    this.port = process.env.SERVER_PORT;
  }
  appConfig() {
    new AppConfig(this.app, this.express).includeConfig();
  }
  /* Including app Routes starts */
  includeRoutes() {
    new Routes(this.app).routesConfig();
  }

  middleware() {
    new MiddleWare(this.app, this.http).load();
  }
  /* Including app Routes ends */
  appExecute() {
    this.appConfig();
    this.includeRoutes();
    this.middleware();

    (async () => {
      // get options from ormconfig.js
      const dbOptions = await getConnectionOptions(process.env.NODE_ENV === 'production' ? 'production' : 'development');
      await createConnection({ ...dbOptions, name: 'default' });
    })();

    // Start your app.
    this.http.listen(this.port, () => {
      console.log('Backend server listen at: ' + this.port);
    });
  }
}
const App = new Server();
App.appExecute();
