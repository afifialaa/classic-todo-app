const express = require('express');
const app = express();

const cors = require('cors');
const path = require('path');
const favicon = require('static-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');

//database config
const db = require('./config/db.config');

//path to routes
const todosRoute = require('./routes/todos.route');
const userRoute = require('./routes/users.route');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//middlewares
app.use(cors());
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());


// routes{ extended: false }
app.use('/todos', todosRoute);
app.use('/users', userRoute);

module.exports = app;
