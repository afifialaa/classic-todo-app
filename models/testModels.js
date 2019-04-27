var BookModel = require('./bookModel');
//include config in main server.js file
var dbConfig = require('../config/dbConfig');

if(BookModel) console.log('required book model');

//dummy data
var book = {
    bookTitle: 'mongoose Tutorial',
    pageNum: '36'
}


var inputBook = new BookModel();

function createBook(){
    inputBook.save(function(err){
        if(err) {
            console.log('failed to save inputBook');
        }else{
            console.log('book was saved');
        }
    });
}

inputBook.removeByTitle('mongoose tutorial', function(){
    console.log('removed by title');
})