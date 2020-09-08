const User = require('../models/user.model');
const token = require('../authentication/token.auth');

const bcrypt = require('bcrypt');

// Signin route
function signin(req, res){
    let userObj = {
        email: req.body.email,
        password: req.body.password
    };

    console.log(userObj.email);

    User.findOne({email:userObj.email}, (err, user)=>{
        // Mongoose error
        if(err) {
            console.log(err);
            return res.json({msg: 'database error'});
        }
        
        if(user === null){
            // Wrong email
            return res.json({err: 'email does not exist'});
        }else{
            bcrypt.compare(userObj.password, user.password, (err, result)=>{
                if(err){
                    console.log(err);
                    return res.json({err: 'failed to authenticate user'});
                }

                if(result == true){
                    // Generate JWT
                    const jwtoken = token.generateToken(user); 
                    return res.json({
                        token: jwtoken,
                        email: user.email
                    });
                }else if(result == false){
                    // Passwords do not match
                    return res.json({msg:'wrong password or email'});
                }
            })
        }
    });
};

function signup(req, res){

    let userObj = {
        email: req.body.email,
        password: req.body.password
    };

    let user = new User(userObj);

    user.save((err, user)=>{
        if(err) {
            console.log(err);
            return res.json({err: 'failed to create user'});
        }

        console.log('user was created');
        return res.json({msg: 'user was created'});
    })
}

module.exports = {
    signin,
    signup
};