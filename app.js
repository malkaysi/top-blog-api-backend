var express = require('express');
var path = require('path');
var passport = require('passport');
const mongoose = require("mongoose");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog'); //Import routes for "blog" area of site
const loginRouter = require('./routes/login');

require('./passport');

dotenv.config();

var app = express();

// Set up mongoose connection
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(passport.initialize());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/blog', blogRouter);
app.use('/login', loginRouter);

module.exports = app;
