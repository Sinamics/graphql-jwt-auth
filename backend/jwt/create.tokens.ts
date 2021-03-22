import { sign } from 'jsonwebtoken';

export const createAccessToken = (user: any) =>
  sign({ id: user.id, username: user.username }, process.env.ACCESS_TOKEN_SECRET as any, {
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });

export const createRefreshToken = (user: any) =>
  sign({ id: user.id, tokenVersion: user.tokenVersion }, process.env.REFRESH_TOKEN_SECRET as any, {
    expiresIn: process.env.REFRESH_TOKEN_LIFE,
  });
