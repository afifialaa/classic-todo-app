var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema({
    bookTitle: {type:String, required:true, max:100},
    pageNum: {type:Number, required:true}
});

BookSchema.statics.removeByTitle = function removeByTitle(bookTitle, callback){
    return this.model.remove({bookTitle:bookTItle}, callback);
}

//module.exports = mongoose.model('Book', BookSchema);
var Book = mongoose.model('Book', BookSchema);
module.exports = Book;

