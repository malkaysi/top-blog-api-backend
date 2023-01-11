const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('dotenv').config();
const User = require("../models/user");
var bcrypt = require('bcryptjs');

// Signup
exports.signup_post = async (req, res, next) => {
  // Check if a username already exists
  User.find({ username: req.body.username })
    .exec(function (err, user) {
      if (err) {
        return next(err);
      }

      if (user.length) {
        res.status(400).json({
          message: 'Please choose a unique username',
        })
        return next('Please choose a unique')
      }
    });

  const inputtedPassword = await req.body.password;

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(inputtedPassword, salt, function (err, hash) {
      if (err) {
        return next(err)
      }

      const user = new User({
        username: req.body.username,
        password: hash
      });

      user.save(err => {
        if (err) {
          return next(err);
        }
      });
    });
  });
}

// Login page get

exports.login_get = (req, res, next) => {
  res.send("TODO: Navigate to login page form if user is not authenticated")
}

// Login Post
exports.login_post = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Login failed',
        user: user
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }

      // generate a signed son web token with the contents of user object and return it in the response

      const token = jwt.sign({ username: user.username, password: user.password },  process.env.JWT_SECRET, { expiresIn: '1 day' },);
      req.userId = user._id
      req.token = token
      return res.json({ user, token });
    });
  })(req, res);
};

// Logout
exports.logout_post = (req, res, next) => {
  // This needs to be built on client side
  // replace jwt token in local storage to '' to log the user out
};