import { ApolloServer } from 'apollo-server-express';
import { AuthDirective } from '../graphql/authDirective';
import { Request, Response, Express } from 'express';
import { authResolvers } from '../graphql/resolvers';
// import { GraphQLDateTime } from 'graphql-iso-date';
import { buildSchema } from 'type-graphql';

class MiddleWare {
  app: any;
  http: any;
  constructor(app: any, http: Express) {
    this.app = app;
    this.http = http;
  }
  async load() {
    const server = new ApolloServer({
      schema: await buildSchema({
        resolvers: [authResolvers],
        validate: false,
      }),
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
  }
}

export default MiddleWare;
