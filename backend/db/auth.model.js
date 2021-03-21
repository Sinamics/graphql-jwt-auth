const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  username: { type: String, unique: true, required: true },
  hash: { type: String, required: true },
  tokenVersion: { type: Number, default: 0 },
  createdDate: { type: Date, default: Date.now },
  lastlogin: { type: Date, default: Date.now },
  role: { type: Array, default: 'user' },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
