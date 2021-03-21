const { gql } = require('@apollo/client');
const { authTypes } = require('./schema');

/* initilize the query and mutation string.
  These will be extended in the project files
   */
const query = gql`
  scalar DateTime
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  type Subscription {
    _empty: String
  }
`;

const typeDefs = [query, authTypes];

module.exports = {
  typeDefs,
};
