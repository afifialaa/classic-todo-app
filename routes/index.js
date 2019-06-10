var express = require('express');
var router = express.Router();
var app = express();

var User = require('../models/userModel.js');

var bodyParser = require('body-parser');
var task = require('../models/taskModel').Task;
var insertTask = require('../models/taskModel').insertTask;
//var taskInput = new task({task:"buy a laptop"});
//insertTask(taskInput);
var session = require('express-session');
var jwt = require('jsonwebtoken');


const assert = require('assert');

const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017/';
const dbName = 'todos';
const client = new MongoClient(dbUrl);

client.connect(function(err, client){
	if(err) throw err;
	console.log('connected to db server');
});

router.get('/', function(req, res) {
	console.log('index was requested');
	res.render('pages/index.html');
});

//user sigining up
router.post('/signup', function(req, res){
	var email = req.body.email;
	var password = req.body.password;
	var user = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: req.body.password
	};
	//validate input

	// connect to database
    MongoClient.connect(dbUrl, function(err, db){
        if(err) throw err;
        console.log('connected to database server : insert.... index.js');
        var userObj = {email:email, passowrd:password};
        var db = db.db(dbName);
        var col = db.collection('users');

        //insert into database
        col.insertOne(userObj, function(err, result){
            if(err) throw err;
            assert.equal(1, result.insertedCount);
            console.log('user inserted');
            //render home page
            res.render('pages/test.html');
        });
		client.close();
    });
});

function authenticate(req, res, next){

    var user = {
      email: req.body.email,
      password: req.body.password
    };

  MongoClient.connect(dbUrl, function(err, db){
    if(err) throw err;

    var dbo = db.db("todos");

    var sess;
    //find user
    dbo.collection("users").findOne({email:req.body.email, password:req.body.password}, function(err, result){
      if(err){
        //flash error and redirect to login
        console.log('oops... something went wrong');
        res.redirect('/');
      }else if(result){
        //found user
        console.log(result);
        app.set('email', user.email);
        db.close();
        next();
      }else if(result == null){
        res.redirect('/');
      } 
      
    });
  });

}

//user logging in
router.post('/login', authenticate, function(req, res){
	//validate input
	console.log('logging in ......')
	res.render('pages/dashboard.html', {email:app.get('email')});
});

module.exports = router;
