const User = require('../models/user.model');

function signin(req, res){
    console.log('signin');
    res.send();
}

function signup(req, res){
    console.log('signup');
    res.send();
}

module.exports = {
    signin,
    signup
}