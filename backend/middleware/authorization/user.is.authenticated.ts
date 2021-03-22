import { Response } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from '../../db/connect';
import { AuthenticationError } from 'apollo-server-express';

interface TokenPayload {
  userId: string;
}

const isAuthenticated = async ({ req }: Response, role?: string) => {
  const { authorization }: any = req?.headers;
  if (!authorization) {
    throw new AuthenticationError('No authorization token found in header!');
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET) as TokenPayload;
    // eslint-disable-next-line no-param-reassign
    if (!payload) throw new AuthenticationError('Token not found!');
    const user = (await User.findById(payload?.userId)) as any;

    if (role && !user.role.includes(role)) {
      throw new AuthenticationError('you do not have correct role to access this page!');
    }

    return user;
  } catch (err) {
    console.log(err.name);
    throw new AuthenticationError('Token found, but is invalid!');
  }
};

export default isAuthenticated;
