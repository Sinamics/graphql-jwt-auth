/* eslint-disable no-underscore-dangle */
/* eslint-disable no-throw-literal */
import { AuthenticationError } from 'apollo-server-express';
import bcrypt from 'bcryptjs';
import { User } from '../db/connect';
import { nameLength } from '../_helpers/name-validation';
import { createAccessToken, createRefreshToken, sendRefreshToken } from '../jwt/validate.token';

const mediumPassword = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');

export const register = async ({ registerData }: any) => {
  if (!registerData) return;
  // Trim all values for trailing white space
  Object.keys(registerData).map((k) => (registerData[k] = typeof registerData[k] == 'string' ? registerData[k].trim() : registerData[k]));

  // username validation
  if (!registerData.username) return new Error(`username required!`);
  if (registerData.username.length <= 3) return new Error(`username must be more than 3 characters!`);
  if (nameLength(registerData.username, 30)) return new Error(`Max 30 char in username`);

  // validate
  if (await User.findOne({ username: registerData.username })) {
    // eslint-disable-next-line no-throw-literal
    return new Error(`username "${registerData.username}" already taken`);
  }

  const user: any = new User(registerData);

  // hash password
  if (registerData.password) {
    if (!mediumPassword.test(registerData.password)) return new Error(`Password does not meet the requirements!`);
    // Valid Password, lets hash it
    user.hash = bcrypt.hashSync(registerData.password, 10);
  }

  // save user
  return await user.save();
};

// eslint-disable-next-line consistent-return
export const login = async ({ loginData: { username, password } }: any, { res }: any) => {
  const user: any = await User.findOne({ username });

  if (!user) throw new AuthenticationError('username or password is wrong!');

  const valid = bcrypt.compareSync(password, user.hash);
  if (!valid) throw new AuthenticationError('username or password is wrong!');

  // Send refresh token as cookie header
  sendRefreshToken(res, createRefreshToken(user));

  // Send accessToken back to user. This will be stored in-memory
  return {
    accessToken: createAccessToken(user),
    user,
  };
};
