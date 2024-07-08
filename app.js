const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
dotenv.config();

const index = require('./routes/index');
const auth = require('./routes/auth');
const chat = require('./routes/chat');

const app = express();

const db = require('./helpers/db')();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

// express-session
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, maxAge: 14 * 24 * 3600000 }
}));

// passport.js
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/auth', auth);
app.use('/chat', chat);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
