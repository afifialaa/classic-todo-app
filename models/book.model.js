var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema({
    bookTitle: {
        type:String,
        required:true, 
        max:100
    },
    pageNum: {
        type:Number, 
        required:true
    }
});

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;

