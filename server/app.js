var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./conf');

// db
const mongoose = require('mongoose');
// mpromises has been deprecated hence it is recomanded to use native promises.
mongoose.Promise = global.Promise;
// logging
const winston = require('winston');
// configure logging
winston.add(winston.transports.File, { 'filename': '/Users/kalpasenanayake/Dev/git_repo/logs/kpizza/kpizza.log', 'level': 'silly' });

var app = express();
var order = require('./routes/order');
var customer = require('./routes/customer');
var authenticate = require('./routes/authenticate');
var tokenVerify = require('./middleware/tokenVerify');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Getting the db connection.
mongoose.connect(config.getDBConString(), 
      {useMongoClient: true});

// Adding the routers.
// authentication router.
app.use('/authenticate', authenticate);
// JWT verification router.
app.use('/api', tokenVerify);
app.use('/api/order', order);
app.use('/api/customer', customer);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next){
  res.status(400).json(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
