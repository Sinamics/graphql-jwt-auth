/* eslint-disable global-require */
const { validateTokensMiddleware } = require('../jwt/validate.token');
const { sendLogoutToken } = require('../jwt/send.logout.token');
class Routes {
  constructor(app) {
    this.app = app;
  }

  /* creating app Routes starts */
  appRoutes() {
    // api routes
    this.app.post('/refresh_token', validateTokensMiddleware);
    this.app.post('/logout', (req, res) => {
      sendLogoutToken(res);
      return res.send({ loggedIn: false, accessToken: null });
    });
  }

  routesConfig() {
    this.appRoutes();
  }
}
module.exports = Routes;
