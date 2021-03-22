/* eslint-disable global-require */
import { validateTokensMiddleware } from '../jwt/validate.token';
import sendLogoutToken from '../jwt/send.logout.token';
import { Request, Response, Express } from 'express';

class Routes {
  app: any;
  constructor(app: Express) {
    this.app = app;
  }

  /* creating app Routes starts */
  appRoutes() {
    // api routes
    this.app.post('/refresh_token', validateTokensMiddleware);
    this.app.post('/logout', (_req: Request, res: Response) => {
      sendLogoutToken(res, '');
      return res.send({ loggedIn: false, accessToken: null });
    });
  }

  routesConfig() {
    this.appRoutes();
  }
}

export default Routes;
