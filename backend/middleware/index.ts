import { ApolloServer, SchemaDirectiveVisitor } from 'apollo-server-express';
import { AuthDirective } from '../graphql/authDirective';
import { Request, Response, Express } from 'express';
import { authResolvers } from '../graphql/resolvers';
// import { GraphQLDateTime } from 'graphql-iso-date';
import { buildSchemaSync } from 'type-graphql';

class MiddleWare {
  app: any;
  http: any;
  constructor(app: any, http: Express) {
    this.app = app;
    this.http = http;
  }
  async load() {
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
  }
}

export default MiddleWare;
