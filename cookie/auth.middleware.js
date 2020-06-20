var db = require("../db");
module.exports.authRequest = function(req, res, next){
    var user = db.get('users').find({id : req.cookies.userId}).value();
    if(!req.cookies.userId){
        res.redirect('/auth/login');
        return;
    }
    
    if(!user){
        res.redirect('/auth/login');
        return;
    }
    next();
};