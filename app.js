var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
const bcrypt = require('bcryptjs');
const models = require('./models');


const LocalStrategy = require('passport-local').Strategy;

var users = require('./routes/users');
var login = require('./routes/login')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: 'james bond',
  resave: false,
  saveUninitialized: false
}));

// FINDING THE USER AND AUTHENTICATING THEM
passport.use('login', new LocalStrategy((username, password, next) => {
  models.Users
    .findOne({
      where: {
        username: username
      }
    })
    .then(user => {
      // Check againt the password
      if (bcrypt.compareSync(password, user.passwordHash)) {
        return next(null, {
          username: user.username,
          id: user.id
        });
      } else {
        return next(null, false, {
          message: "I'm sorry your not allowed in here!"
        });
      }
    })
    .catch(err => {
      return next(err)
    })
}));

// BUILDING NEW USER
passport.use('signup', new LocalStrategy((username, password, next) => {
  let data = {
    username: username,
    password: password
  }
  models.Users
    .build(data)
    .save()
    .then(user => {
      // save to Database
      return next(null, {username:user.username, id: user.id})
    })
    .catch(err => {
      console.log("1", err);
      next(err)
    })
}));

passport.serializeUser((user, next) => {
  next(null, user.id)
});

passport.deserializeUser(function (id, next) {
  models.Users.findOne({
    where: {
      id: id
    }
  }).then(user => {
    next(null, {
      username: user.username,
      id: user.id
    })
  })
});



app.use(passport.initialize());
app.use(passport.session());



app.use('/api', users);
app.use('/', login(passport));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;