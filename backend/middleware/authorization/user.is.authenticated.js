const { verify } = require('jsonwebtoken');
const db = require('../../db/connect');
const { AuthenticationError } = require('apollo-server-express');
const { User } = db;

const isAuthenticated = async ({ req }, role) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new AuthenticationError('No authorization token found in header!');
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
    // eslint-disable-next-line no-param-reassign
    if (!payload) throw new AuthenticationError('Token not found!');
    let u = await User.findById(payload.userId);

    if (role && !u.role.includes(role)) {
      throw new AuthenticationError('you do not have correct role to access this page!');
    }

    return u;
  } catch (err) {
    console.log(err.name);
    throw new AuthenticationError('Token found, but is invalid!');
  }
};

module.exports = { isAuthenticated };
