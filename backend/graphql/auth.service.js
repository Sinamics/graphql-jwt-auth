/* eslint-disable no-underscore-dangle */
/* eslint-disable no-throw-literal */
const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const db = require('../db/connect');
const { nameLength } = require('../_helpers/name-validation');
const { createAccessToken, createRefreshToken, sendRefreshToken } = require('../jwt/validate.token');
const { User } = db;

const mediumPassword = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');

module.exports = {
  register,
  login,
};

async function register({ registerData }) {
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

  const user = new User(registerData);

  // hash password
  if (registerData.password) {
    if (!mediumPassword.test(registerData.password)) return new Error(`Password does not meet the requirements!`);
    // Valid Password, lets hash it
    user.hash = bcrypt.hashSync(registerData.password, 10);
  }

  // save user
  await user.save();
}

// eslint-disable-next-line consistent-return
async function login({ loginData: { username, password } }, { res }) {
  const user = await User.findOne({ username });

  if (!user) throw new AuthenticationError('email or password is wrong!');

  const valid = bcrypt.compareSync(password, user.hash);
  if (!valid) throw new AuthenticationError('email or password is wrong!');

  // Send refresh token as cookie header
  sendRefreshToken(res, createRefreshToken(user));

  // Send accessToken back to user. This will be stored in-memory
  return {
    accessToken: createAccessToken(user),
    user,
  };
}
