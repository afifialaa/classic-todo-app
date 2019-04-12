const joi = require('joi');
const mongoose = require('mongoose');

//each schema maps to a MongoDB collection
var Schema = mongoose.Schema;

//creating task schema
var userSchema = new Schema({
	firstName:String,
	lastName:String,
	email:String,
	passowrd:String
});

//creating model
var User = mongoose.model('users', userSchema);

//create user method
var createUser = function(user){
	user.save(function(err){
		if(err) throw err;
		console.log('user created');
	});
};

//find user
var findUser = function(user){
	user.findOne(function(err){
		if(err) throw err;
		console.log('found user');
	});
};
	
//exporting the model
module.exports.User = User;

//exporting create user function
module.exports.createUser = createUser;

//exporting find user function
module.exports.findUser = findUser;

