var createError = require('http-errors');
var express = require('express');
var exphbs  = require('express-handlebars');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

// view engine setup

app.engine('hbs', exphbs({defaultLayout: 'home', extname: '.hbs', partialsDir: path.join(__dirname, './app/views/partials/')}));
app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json({limit: '10mb', extended: true}));
app.use(express.urlencoded({limit: '10mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/image_uploads',  express.static(path.join(__dirname, './app/files/checkin_selfie_uploads')))

var dashboardRouter = require('./app/controllers/routes/dashboard');
var loginRouter = require('./app/controllers/routes/login');
var logoutRouter = require('./app/controllers/routes/logout');
var registerRouter = require('./app/controllers/routes/register');

app.use('/dashboard', dashboardRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/register', registerRouter)

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
  res.render('error', {
    date_now: Date.now() ,
    layout: '../layouts/error'
  });
});



module.exports = app;
