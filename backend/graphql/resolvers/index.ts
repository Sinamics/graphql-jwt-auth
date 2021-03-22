import { register, login } from '../auth.service';
import isAuthenticated from '../../middleware/authorization/user.is.authenticated';

export const authResolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: any) => {
      return isAuthenticated(context);
    },
    superuser: async (_parent: any, _args: any, context: any) => {
      return isAuthenticated(context, 'superuser');
    },
    userRoleData: async () => {
      return { message: 'Hey from backend' };
    },
    superUserRoleData: async () => {
      return { message: 'Hey from backend' };
    },
  },
  Mutation: {
    login: async (_: any, args: any, context: any) => {
      return login(args, context);
    },
    register: async (_: any, args: any) => {
      return register(args);
    },
  },
};
