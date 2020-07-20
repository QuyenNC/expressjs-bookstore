var db = require("../db");
//using shortid
var shortid = require('shortid');
var cookieParser = require('cookie-parser');
module.exports.shoppingCart = function(req, res, next){
    if(!req.signedCookies.sessionId){
        sessionId = shortid.generate();
        res.cookie('sessionId',sessionId,{
            signed : true
        });
        db.get('sesstion').push({id :sessionId }).write();
        db.get('sesstion').find({id : sessionId}).set('numberOfBook' , 0).write();
    }
    next();
};