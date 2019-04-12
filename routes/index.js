var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var task = require('../models/taskModel').Task;
var insertTask = require('../models/taskModel').insertTask;
//var taskInput = new task({task:"buy a laptop"});
//insertTask(taskInput);


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
        console.log('connected to database server : insert');
        var userObj = {email:email, passowrd:password};
        var db = client.db(dbName);
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

//user logging in
router.post('/login', function(req, res){
	//validate input

	MongoClient.connect(dbUrl, function(err, db){
		if(err) throw err;

		//authenticate user
		var user = {
			email: req.body.email,
			password: req.body.password
		};
	
		var db = client.db(dbName);
		var collection = db.collection('users');

		//find user
		collection.findOne({email:user.email, password: user.password}, function(err, result){
			if(err){
				//flash error and redirect to login
				throw err;
				console.log('Wrong email or password');
				var errMsg = 'Wrong email or password';
				res.render('pages/index.html', {errMsg:errMsg});
			}else if(result){
				//log user in
				var errMsg = 'logged in successfully';
				res.redirect('/todos');
			}else if(!result){
				console.log('not result');
				var errMsg = 'Worng email or password';
				res.render('pages/index.html', {errMsg: errMsg});
			}
						
		});

	});
		
});

module.exports = router;




















