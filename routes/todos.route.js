const express = require('express');
const router = express.Router();

const todosController = require('../controllers/todos.controller');

router.get('/', todosController.index);
router.get('/getTasks', todosController.getTasks);
router.post('/addTask', todosController.addTask);
router.post('/deleteTask', todosController.deleteTask);


module.exports = router;
