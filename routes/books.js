var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017/';
const dbName = 'todos';
const client = new MongoClient(dbUrl);

router.get('/', function(req, res){
	console.log('books page was requested');
	res.render('pages/books.html');
});

router.post('/addBook', function(req, res){

	//book object
	var bookObj = {
		bookTitle: req.body.bookTitle,
		pageNum: req.body.pageNum
	};

	console.log('book title: ' + bookObj.bookTitle);
	console.log('page number: ' + bookObj.pageNum);

	//db connection
	client.connect(function(err, client){
		if(err) throw err;
		
		var db = client.db(dbName);
		var col = db.collection('books');

		//insert into db
		col.insertOne(bookObj, function(err, result){
			if(err) throw err;
			console.log('inserted book');
		});
	});
	res.status(200);
});

//load page with books
router.get('/getBooks', function(req, res){
	console.log('server get books was invoked');
	//get data from db
	client.connect(function(err, client){
		if(err) throw err;

		var db = client.db(dbName);
		var col = db.collection('books');

		//find books
		col.find({}).toArray(function(err, result){
			if(err) throw err;
			console.log(result);
			res.send(JSON.stringify(result));
		});
	});

});

module.exports = router;
