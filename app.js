var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

var indexRouter             = require('./routes/index');
var usersRouter             = require('./routes/users');
var loginRouter             = require('./routes/login');
var seoulparkinglotRouter   = require('./routes/seoulparkinglot');
var incheonparkinglotRouter = require('./routes/incheonparkinglot');
var seoulcctvRouter         = require('./routes/seoulcctv');
var incheoncctvRouter       = require('./routes/incheoncctv');
var searchseoulRouter       = require('./routes/searchseoul');
var ownparkRouter       = require('./routes/ownpark');

var app = express();
app.use(bodyParser.json())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 5000)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/seoulparkinglot', seoulparkinglotRouter);
app.use('/incheonparkinglot', incheonparkinglotRouter);
app.use('/seoulcctv', seoulcctvRouter);
app.use('/incheoncctv', incheoncctvRouter);
app.use('/searchseoul', searchseoulRouter);
app.use('/ownpark', ownparkRouter);

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

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/final_api');

app.listen(app.get('port'), () =>{
	console.log('5000 Port : 서버 실행 중')
});

module.exports = app;
