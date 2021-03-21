const authService = require('../auth.service');
const { isAuthenticated } = require('../../middleware/authorization/user.is.authenticated');

const authResolvers = {
  Query: {
    me: async (parent, args, context) => {
      return isAuthenticated(context);
    },
    superuser: async (parent, args, context) => {
      return isAuthenticated(context, 'superuser');
    },
    userRoleData: async (parent, args, context) => {
      return { message: 'Hey from backend' };
    },
    superUserRoleData: async (parent, args, context) => {
      return { message: 'Hey from backend' };
    },
  },
  Mutation: {
    login: async (_parent, args, context) => {
      return authService.login(args, context);
    },
    register: async (_parent, args, context) => {
      return authService.register(args, context);
    },
  },
};

module.exports = {
  authResolvers,
};
