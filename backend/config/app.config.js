require('dotenv').config();
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');

class AppConfig {
  constructor(app, express) {
    this.app = app;
    this.express = express;
  }

  includeConfig() {
    this.app.use(helmet());
    this.app.use(this.express.urlencoded({ extended: false }));
    this.app.use(this.express.json());
    this.app.use(cookieParser());

    // Serve Files
    this.app.use('/asset', this.express.static('asset'));

    if (process.env.NODE_ENV !== 'production') {
      this.app.use(
        cors({
          origin: ['http://localhost:3000'],
          credentials: true,
        })
      );
    }
  }
}
module.exports = AppConfig;
