var createError = require('http-errors');
var express = require('express');
const cors = require('cors');
var path = require('path');
require("./config/connection"); // create db connection
const env = process.env.NODE_ENV || 'development';
const env_vars = require('./config/config')[env];

const indexRouter = require('./routes/index');

var app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin:  env_vars.cors_frontend_origib}));

app.use('/api', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
  res.status(err.statusCode  || 500);
  res.send({
    status: err.statusCode || 500,
    message: err.message
  });
});

module.exports = app;
