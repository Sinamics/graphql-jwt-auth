const { typeDefs } = require('../graphql/rootDef');
const { resolvers } = require('../graphql/rootResolvers');
const { ApolloServer } = require('apollo-server-express');
const { AuthDirective } = require('../graphql/authDirective');

class MiddleWare {
  constructor(app, http) {
    this.app = app;
    this.http = http;
  }
  load() {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req, res }) => ({ req, res }),
      schemaDirectives: {
        hasRole: AuthDirective,
      },
    });

    const { app } = this;

    server.applyMiddleware({ app, cors: false });
  }
}

module.exports = { MiddleWare };
