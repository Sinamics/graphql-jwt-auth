/**
 *
 * Server
 *
 * * * * * * * * * * * * * * * * * * * *
 * @author: Bernt Christian Egeland    *
 * * * * * * * * * * * * * * * * * * * *
 *
 *
 */

import http from 'http';
import express, { Request, Response } from 'express';
import { ApolloServer, SchemaDirectiveVisitor } from 'apollo-server-express';
import { createConnection, getConnectionOptions } from 'typeorm';
import { buildSchemaSync } from 'type-graphql';
import { authResolvers } from './graphql/resolvers';
import { AuthDirective } from './graphql/authDirective';
import { validateTokensMiddleware } from './jwt/validate.token';
import sendLogoutToken from './jwt/send.logout.token';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

class Server {
  private express: any;
  private app: express.Application;
  private http: http.Server;
  private port: Number;

  constructor() {
    dotenv.config();

    this.express = express;
    this.app = this.express();
    this.http = http.createServer(this.app);
    this.port = Number(process.env.SERVER_PORT);

    this.start();
  }
  private async start(): Promise<boolean> {
    await this.config();
    await this.routes();
    await this.middleware();
    await this.typeorm();
    await this.serverListen();
    return true;
  }
  private async config(): Promise<boolean> {
    this.app.use(helmet({ contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false }));
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

    return true;
  }

  /* Including app Routes starts */
  private async routes(): Promise<boolean> {
    this.app.post('/refresh_token', validateTokensMiddleware);
    this.app.post('/logout', (_req: Request, res: Response) => {
      sendLogoutToken(res, '');
      return res.send({ loggedIn: false, accessToken: null });
    });
    return true;
  }

  private async middleware(): Promise<boolean> {
    // build the schema as always
    const schema = buildSchemaSync({
      resolvers: [authResolvers],
      validate: false,
    });
    // register the used directives implementations
    SchemaDirectiveVisitor.visitSchemaDirectives(schema, {
      hasRole: AuthDirective,
    });
    const server = new ApolloServer({
      schema,
      context: ({ req, res }: { req: Request; res: Response }) => ({ req, res }),
      schemaDirectives: {
        hasRole: AuthDirective,
      },
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
    });

    const { app } = this;

    server.applyMiddleware({ app, cors: false });

    return true;
  }

  private async typeorm(): Promise<boolean> {
    // get options from ormconfig.js
    const dbOptions = await getConnectionOptions(process.env.NODE_ENV === 'production' ? 'production' : 'development');
    await createConnection({ ...dbOptions, name: 'default' });
    return true;
  }

  /* Including app Routes ends */
  private async serverListen(): Promise<boolean> {
    // Start your app.
    this.http.listen(this.port, () => {
      console.log('Backend server listen at: ' + this.port);
    });

    return true;
  }
}

new Server();
