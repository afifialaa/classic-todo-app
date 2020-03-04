const mongoose = require('mongoose');

//each schema maps to a MongoDB collection
const Schema = mongoose.Schema;

//creating task schema
const UserSchema = new Schema({
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

//exporting model
const User = mongoose.model('users', UserSchema);
module.exports = User;