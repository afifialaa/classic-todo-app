var express = require('express');
var router = express.Router();

const assert = require('assert');

const MongoClient = require('mongodb').MongoClient;

//mongoose congif
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todos');
var monConn = mongoose.connection;
monConn.once('open', function(){
    console.log('mongoose connected');
});

var TaskSchema = new mongoose.Schema({
    task:String
});

//schema -> model
var TaskModel = mongoose.model('TaskModel', TaskSchema);

//database connection
const dbUrl = 'mongodb://localhost:27017/';
const dbName = 'todos';
const client = new MongoClient(dbUrl);


/* GET home page. */
router.get('/', function(req, res) {
	console.log('server is running.....');
	client.connect(function(err, client){
        if(err) throw err;
		console.log('connected to database server : find');
		var db = client.db(dbName);
        var col = db.collection('todos');
		
        //find in database
		col.find({}).toArray(function(err, docs){
			console.log('found everything');
			//client.close();
            var result = docs;
            //render page with tasks
            res.render('todos.html', {tasks:result});
		});
	});
});

// POST home page
router.post('/addTask', function(req, res){
    console.log('wanted to add a task: ' , req.body.task); 
    var task = req.body.task;
    
    // connect to database
    MongoClient.connect(dbUrl, function(err, db){
        if(err) throw err;
        console.log('connected to database server : insert');
        var taskObj = {task:task};
        var db = client.db(dbName);
        var col = db.collection('todos');

        //insert into database
        col.insertOne(taskObj, function(err, result){
            if(err) throw err;
            assert.equal(1, result.insertedCount);
            console.log('task inserted');
            //render home page
            res.render('todos.html');
        });
    });
});

module.exports = router;
