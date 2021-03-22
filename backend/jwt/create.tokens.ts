import { IUserDoc } from 'backend/db/auth.model';
import { sign } from 'jsonwebtoken';

export const createAccessToken = (user: IUserDoc) =>
  sign({ userId: user.id, username: user.username }, process.env.ACCESS_TOKEN_SECRET as any, {
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });

export const createRefreshToken = (user: IUserDoc) =>
  sign({ userId: user.id, tokenVersion: user.tokenVersion }, process.env.REFRESH_TOKEN_SECRET as any, {
    expiresIn: process.env.REFRESH_TOKEN_LIFE,
  });
