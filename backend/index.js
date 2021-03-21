const http = require('http');
const express = require('express');
const AppConfig = require('./config/app.config');
const Routes = require('./routes');
const { MiddleWare } = require('./middleware/index');

class Server {
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

    // Start your app.
    this.http.listen(this.port, () => {
      console.log('Backend server listen at: ' + this.port);
    });
  }
}
const App = new Server();
App.appExecute();
