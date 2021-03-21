const { authResolvers } = require('./resolvers');
const { GraphQLDateTime } = require('graphql-iso-date');

const resolvers = [authResolvers, { DateTime: GraphQLDateTime }];

module.exports = {
  resolvers,
};
