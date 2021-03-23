import { verify } from 'jsonwebtoken';
import { createRefreshToken, createAccessToken } from './create.tokens';
import sendRefreshToken from './send.refresh.token';
import { Request, Response } from 'express';
import { User } from '../graphql/entity/Users';

/* 
 This functions is called from the /routes directive when /refresh_token is sent to server. 
 
*/

async function validateTokensMiddleware(req: Request, res: Response) {
  const token = req.cookies && req.cookies.randomname;

  if (!token) {
    return res.status(400).send({ loggedIn: false, accessToken: null, message: 'not logged in' });
  }

  let payload = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET as any) as any;
  } catch (err) {
    return res.status(400).send({ loggedIn: false, accessToken: '', message: 'token does not match!' });
  }
  // token is valid and
  // we can send back an access token
  const user: any = await User.findOne(payload.id);

  if (!user) {
    return res.status(400).send({ loggedIn: false, accessToken: '' });
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    return res.status(400).send({ loggedIn: false, accessToken: '' });
  }

  // Update database with the last seen time
  user.lastseen = new Date();
  user.save();

  sendRefreshToken(res, createRefreshToken(user));

  delete user.hash;
  return res.send({
    loggedIn: true,
    accessToken: createAccessToken(user),
  });
}

export { sendRefreshToken, createRefreshToken, createAccessToken, validateTokensMiddleware };
