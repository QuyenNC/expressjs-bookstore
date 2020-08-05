
//using mongoose
var Sessions = require("../models/sessions.models.js");
var cookieParser = require('cookie-parser');
module.exports.shoppingCart = async function(req, res, next){
    if(!req.signedCookies.sessionId){
        var session =  await Sessions.create({numberOfBook: 0,cart:{}});
        res.cookie('sessionId',session._id,{
            signed : true
        });
        session.save();
        res.redirect("/");
    }
    next();
};