import { AuthenticationError, SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import { verify } from 'jsonwebtoken';
import { User } from './entity/Users';

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: any) {
    const requiredRole = this.args.roles;
    const originalResolve = field.resolve || defaultFieldResolver;

    field.resolve = async function (...args: any) {
      const context = args[2];
      const { authorization } = context.req.headers;
      if (!authorization) {
        throw new Error('not authenticated');
      }
      try {
        const token = authorization.split(' ')[1];
        const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user: any = await User.findOne(payload.id);
        const userRoles = user.role || [];
        const isUnauthorized = !requiredRole.some((r: string) => userRoles.includes(r));

        if (isUnauthorized) {
          throw new AuthenticationError(`You need following role: ${requiredRole}`);
        }

        return originalResolve.apply(this, args);
      } catch (err) {
        console.log(err);
        throw new AuthenticationError(err);
      }
    };
  }
}

export { AuthDirective };
