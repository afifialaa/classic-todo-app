var express = require('express');
var router = express.Router();

//const user = require('../model/userModel.js').User;

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/', function(req, res){
	//check if user already exists
});

module.exports = router;
