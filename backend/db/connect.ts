/* eslint-disable global-require */
import { User } from './auth.model';
import mongoose from 'mongoose';
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

export { User };
