// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
//
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
//
// var app = express();
//
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
//
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//
// module.exports = app;

var skype = require('botbuilder');
var express = require('express');
var APP_ID = '';
var APP_SECRET = '';


var app = express();

var botService = new skype.ChatConnector({
    appId: APP_ID,
    appPassword: APP_SECRET
});

var bot = new skype.UniversalBot(botService);

app.post('api/messages', botService.listen());

bot.dialog('/', function (session) {
    if (session.message.text.toLowerCase().indexOf('Hola') >= 0) {
        session.send('Hola ' + session.message.user.name + 'soy tu bot y este fue tu mensaje: ' + session.message.text);
    } else {
        session.send('Perdona algo ha salido mal');
    }
});

app.get('/', function (req,res) {
    res.send('SkypeBOT a la escucha...');
});

app.listen(process.env.port, function() {
    console.log('SkypeBOT a la escucha...');
});