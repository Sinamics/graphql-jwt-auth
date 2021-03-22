import { authResolvers } from './resolvers';
import { GraphQLDateTime } from 'graphql-iso-date';

export const resolvers = [authResolvers, { DateTime: GraphQLDateTime }] as any;
