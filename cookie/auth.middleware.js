var db = require("../db");
//using mongoose
var Books = require("../models/books.models");
var Users = require("../models/users.models.js");
var cookieParser = require('cookie-parser');
module.exports.authRequest = async function(req, res, next){
    if(!req.signedCookies.userId){
        res.redirect('/auth/login');
        return;
    }
    var user = await Users.findById(req.signedCookies.userId);
    if(!user){
        res.redirect('/auth/login');
        return;
    }
    next();
};