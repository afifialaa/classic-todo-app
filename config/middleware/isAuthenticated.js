module.exports = function(req, res, next){
    //user is logged in
    if(req.user){
        return next();
    }

    //not logged in, redirect to home page
    return res.redirect("/");
}