var express = require('express');
var path = require('path');
var config = require('./configs/config.js');
var nunjucks = require('nunjucks');
require('colors');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var bodyParser = require('body-parser');
require('./models');
var auth = require('./middlewares/auth.js')
var renderMiddleware = require('./middlewares/render');

var home = require('./routes/home');
var users = require('./routes/users');
var sign = require('./routes/sign')

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
nunjucks.configure(path.join(__dirname, 'views'), {
    autoescape: true,
    express: app
});

if (config.debug) {
    //render time
    app.use(renderMiddleware.render);
}
// app.set('view engine', 'html');
// app.engine('html', require('nunjucks'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(config.session_secret));
app.use(session({
    secret: config.session_secret,
    store: new RedisStore({
        host: config.redis_host,
        port: config.redis_port,
        db: config.redis_db,
        pass: config.redis_password
    }),
    resave: false,
    saveUninitialized: false,
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', [home, sign]);
// app.use('/', sign);
app.use('/users', users);

//middleware my
app.use(auth.authUser);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    console.log(err.message);
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;