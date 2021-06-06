'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const user = require('../../models/data-collection.js');
const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

router.post('/login-google', async (req, res) => {
  let token = req.body.token;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const { name, email, picture } = ticket.getPayload();
  const exist = await User.findOne({
    email,
  });
  if (!exist) {
    let record = await user.addUser({
      username: name,
      email,
      imgUrl: picture,
      password: 'google',
    });
    res.status(201).json(record);
  } else {
    res.status(201).json(exist);
  }
});

function GoogleUser(name, email, password, imgUrl) {
  this.username = name;
  this.email = email;
  this.password = password;
  this.imgUrl = imgUrl;
}

module.exports = router;
