'use strict';

const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imgUrl: {
      type: String,
      default:
        'https://i.pinimg.com/originals/f9/b4/32/f9b432825a84cde107e5a9883ea561cc.png',
    },
    active: { type: Boolean, default: true },
    gamePlayed: { type: Number, default: 0 },
    gameWin: { type: Number, default: 0 },
    winRatio: { type: Number, default: 0 },
    friendList: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    reports: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Report',
      },
    ],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'editor', 'admin'],
    },
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

// virtuals for token and capabilities
userSchema.virtual('token').get(function () {
  let tokenData = {
    id: this._id,
    username: this.username,
    email: this.email,
    imgUrl: this.imgUrl,
  };
  return jwt.sign(tokenData, process.env.SECRET);
});

userSchema.virtual('capabilities').get(function () {
  let acl = {
    user: ['read'],
    editor: ['read', 'create', 'update'],
    admin: ['read', 'create', 'update', 'delete'],
  };
  return acl[this.role];
});

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});
// userSchema.pre('findOne', function () {
//   let tokenData = {
//     username: this.username,
//     email: this.email,
//   };
//   return jwt.sign(tokenData, process.env.SECRET);
// });
// BASIC AUTH
userSchema.statics.authenticateBasic = async function (email, password) {
  const user = await this.findOne({ email });
  const valid = await bcrypt.compare(password, user.password);
  if (valid) return user;
  throw new Error('Invalid username or password');
};

// BEARER AUTH
userSchema.statics.authenticateWithToken = async function (token) {
  const parsedToken = jwt.verify(token, process.env.SECRET);
  console.log('__token__', parsedToken.email);
  const user = this.findOne({ email: parsedToken.email });
  if (user) return user;
  throw new Error('User Not Found');
};

const UserModel = model('User', userSchema);

module.exports = UserModel;
