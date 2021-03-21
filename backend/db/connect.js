/* eslint-disable global-require */
const mongoose = require('mongoose');
const isDev = process.env.NODE_ENV !== 'production';

mongoose
  .connect(isDev ? process.env.DEV_MONGO_CONNECTION : process.env.PROD_MONGO_CONNECTION, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((err) => console.warn(err));
mongoose.Promise = global.Promise;

module.exports = {
  User: require('../graphql/auth.model'),
};
