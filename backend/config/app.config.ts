import dotenv from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Express } from 'express';

dotenv.config();

class AppConfig {
  app: any;
  express: any;
  constructor(app: any, express: Express) {
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

export default AppConfig;
