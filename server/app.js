var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

const mongoose = require('mongoose');
var testsRouter = require('./routes/tests');

/**
 * setup dev environment (part 1)
 * 
 * Please setup your environment using as:
 * 1. make your file.
 * 2. Save it in setup folder.
 * 3. Run node setup/setup 
 */
require('dotenv').config()

// Set up mongoose connection
mongoose.connect(process.env.MONGO_DB_URL, (err) => {
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.disable('view cache');

app.use('/tests', testsRouter);

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
  res.send(err);
});

module.exports = app;
