const express = require('express');
const router = express.Router();

const bookController = require('../controllers/books.controller');

router.get('/', bookController.getBooks);
router.post('/addBook', bookController.addBook);
router.post('/editBook', bookController.editBook);
router.post('/deleteBook', bookController.deleteBook);

module.exports = router;