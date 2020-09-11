var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var animeRouter = require('./routes/animeRouter');
var mangaRouter = require('./routes/mangaRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//mongoDB connection
const url = 'mongodb://localhost:27017/anime';

/* Non necessario in mongoose 5.x
const options = {
  useMongoClient: true
}; */
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log('Database connected correctly');
  const port = 3000;
  app.listen(port, () => {
    console.log('server listening on port ', port);
  });
}, (err) => { console.log('Error while connecting to database: ', err)});

//routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/anime', animeRouter);
app.use('/manga', mangaRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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




