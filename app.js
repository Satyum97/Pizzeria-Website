var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var pizzas = require('./routes/pizzas');

var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session=require('express-session');
var MongoStore=require('connect-mongo')(session);
var app = express();
var upload = require('express-fileupload');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({  secret:'this-is-a-secret-token',
					saveUninitialized:true,
					resave : true,
					store : new MongoStore({
						mongooseConnection : mongoose.connection
					}),
					cookie : {maxAge : 180*60*1000},
				}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(upload());

app.all(function(req, res, next) {
  if (req.query.limit <= 10) req.query.limit = 10;
  next();
});

app.use('/trial', index);
app.use('/', index);

app.use('/users', users);
app.use('/api/pizzas', pizzas);

var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

mongoose.connect('mongodb://localhost/passport_local_mongoose_express5');


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.session=req.session.user;
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
