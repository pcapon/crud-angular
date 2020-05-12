var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var patientRouter = require('./routes/patient.routes');
var drugRouter = require('./routes/drug.routes');
var doctorRouter = require('./routes/doctor.routes');
var treatmentRouter = require('./routes/treatment.routes');
var mongoose = require("mongoose");

var app = express();
app.use(cors());

var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, { useNewUrlParser: true, useFindAndModify: false });

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/patient', patientRouter);
app.use('/drug', drugRouter);
app.use('/doctor', doctorRouter);
app.use('/treatment', treatmentRouter);

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
});

module.exports = app;
