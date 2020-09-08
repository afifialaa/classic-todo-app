const mongoose = require('mongoose');
const bc = require('bcrypt');
const saltRounds = 10;

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

// Hashing password
UserSchema.pre('save', function (next) {
    let user = this;

    bc.genSalt(saltRounds, function (err, salt) {
        if (err) return next(err);

        bc.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        })
    })
});

// Exporting model
const User = mongoose.model('users', UserSchema);
module.exports = User;