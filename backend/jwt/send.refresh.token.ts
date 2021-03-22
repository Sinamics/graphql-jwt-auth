import { Response } from 'express';

const sendRefreshToken = (res: Response, token: string) => {
  res.cookie('randomname', token, {
    maxAge: 1000 * 60 * 60 * 24 * 50, // 50 days in milliseconds
    httpOnly: true,
    sameSite: true,
    secure: false,
    // domain: "localhost:3000/", //set your domain
    path: '/refresh_token',
  });
};

export default sendRefreshToken;
