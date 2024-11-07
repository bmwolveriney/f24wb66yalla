var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var fossilsRouter = require('./routes/fossils');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Define the route for fossils
app.get('/fossils', (req, res) => {
  const fossils = [
    { name: 'Trilobite', age: 500, location: 'Utah' },
    { name: 'Ammonite', age: 200, location: 'Morocco' },
    { name: 'Megalodon Tooth', age: 15, location: 'California' }
  ];
  // Render the 'fossils' view, passing the fossils data
  res.render('fossils', { fossils });
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/fossils', fossilsRouter);

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

module.exports = app;
