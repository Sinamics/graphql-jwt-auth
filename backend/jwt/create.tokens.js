const { sign } = require('jsonwebtoken');

const createAccessToken = (user) =>
  sign({ userId: user.id, username: user.username }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });

const createRefreshToken = (user) =>
  sign({ userId: user.id, tokenVersion: user.tokenVersion }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_LIFE,
  });

module.exports = {
  createAccessToken,
  createRefreshToken,
};
