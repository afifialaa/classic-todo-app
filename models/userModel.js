const joi = require('joi');
const mongoose = require('mongoose');

//each schema maps to a MongoDB collection
var Schema = mongoose.Schema;

//creating task schema
var userSchema = new Schema({
	email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
  	type: String,
  	required: true
  }
});

//create user method
var createUser = function(user){
	user.save(function(err){
		if(err) throw err;
		console.log('user created');
	});
};

//find user
userSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      if(user.password == password){
      	return callback(null, user);
      }else{
      	return callback();
      }
    });
}
	
//exporting the model
var User = mongoose.model('users', userSchema);
module.exports = User;

//exporting create user function
module.exports.createUser = createUser;

