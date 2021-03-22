import { typeDefs } from '../graphql/rootDef';
import { resolvers } from '../graphql/rootResolvers';
import { ApolloServer } from 'apollo-server-express';
import { AuthDirective } from '../graphql/authDirective';
import { Request, Response, Express } from 'express';

class MiddleWare {
  app: any;
  http: any;
  constructor(app: any, http: Express) {
    this.app = app;
    this.http = http;
  }
  load() {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
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
