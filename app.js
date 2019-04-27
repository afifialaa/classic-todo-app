var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var uuid = require('uuid/v4');
var proxy = require('http-proxy-middleware');
const session = require('express-session');
var jwt = require('jsonwebtoken');

//path to routes
var index = require('./routes/index');
var todos = require('./routes/todos');
var users = require('./routes/users');
var books = require('./routes/books')

//proxy
const { routes } = require('./config.json');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:'secretKey'}));
app.use(express.static(path.join(__dirname, 'public')));


// routes{ extended: false }
app.use('/', index);
app.use('/books', books);
app.use('/todos', todos);
app.use('/users', users);

module.exports = app;
