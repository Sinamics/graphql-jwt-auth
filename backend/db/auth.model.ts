import mongoose from 'mongoose';
const { Schema, Model, model } = mongoose;

interface IUser {
  username: string;
  hash: string;
  tokenVersion: string;
  createdDate: string;
  lastlogin: string;
  role: any;
}

interface IUserDoc extends IUser, Document {
  id: string;
}

const UserSchemaFields: Record<keyof IUser, any> = {
  username: { type: String, unique: true, required: true },
  hash: { type: String, required: true },
  tokenVersion: { type: Number, default: 0 },
  createdDate: { type: Date, default: Date.now },
  lastlogin: { type: Date, default: Date.now },
  role: { type: Array, default: 'user' },
};

// UserSchema.set('toJSON', { virtuals: true });
const UserSchema = new Schema(UserSchemaFields);

const User = model('User', UserSchema);

export { User, IUserDoc, IUser };
