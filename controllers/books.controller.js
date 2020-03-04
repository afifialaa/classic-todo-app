const Book = require('../models/book.model');
function getBooks(req, res){
    res.render('pages/books.html');
}

function addBook(req, res){

}

function deleteBook(req, res){

}

function editBook(req, res){

}

module.exports = {
    getBooks,
    addBook,
    deleteBook,
    editBook
}