const { ForbiddenError, SchemaDirectiveVisitor } = require('apollo-server-express');
const { defaultFieldResolver } = require('graphql');
const { verify } = require('jsonwebtoken');
const db = require('../db/connect');
const { User } = db;

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const requiredRole = this.args.roles;
    const originalResolve = field.resolve || defaultFieldResolver;

    field.resolve = async function (...args) {
      const context = args[2];
      const { authorization } = context.req.headers;

      if (!authorization) {
        throw new Error('not authenticated');
      }
      try {
        const token = authorization.split(' ')[1];
        const payload = verify(token, process.env.ACCESS_TOKEN_SECRET);

        let u = await User.findById(payload.userId);
        const userRoles = u.role || [];
        const isUnauthorized = !requiredRole.some((r) => userRoles.includes(r));

        if (isUnauthorized) {
          throw new ForbiddenError(`You need following role: ${requiredRole}`);
        }

        return originalResolve.apply(this, args);
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    };
  }
}

module.exports = { AuthDirective };
