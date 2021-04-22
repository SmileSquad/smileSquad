'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const users = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    imgurl: { type: String },
    active: { type: Boolean, required: true,default: true },
    gamePlayed: { type: Number },
    gameWin: { type: Number },
    winRatio: { type: Number },
    // friendList:[],
    // reportsNumbers:{ type:int},
    // reports:[],

    role: { type: String, required: true, default: 'user', enum: ['user', 'admin'] },
});

users.virtual('token').get(function () {
    let tokenObject = {
        username: this.username,
    }
    return jwt.sign(tokenObject, process.env.KEY)
});

users.virtual('capabilities').get(function () {
    let acl = {
        user: ['read'],
        admin: ['read', 'create', 'update', 'delete']
    };
    return acl[this.role];
});

users.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

// BASIC AUTH
users.statics.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ username })
    const valid = await bcrypt.compare(password, user.password)
    if (valid) { return user; }
    throw new Error('Invalid User');
}

// BEARER AUTH
users.statics.authenticateWithToken = async function (token) {
    try {
        const parsedToken = jwt.verify(token, process.env.KEY);
        const user = this.findOne({ username: parsedToken.username })
        console.log(user._conditions.username)
        if (user) { return user; }
        throw new Error("User Not Found");
    } catch (e) {
        throw new Error(e.message)
    }
}


module.exports = mongoose.model('users', users);