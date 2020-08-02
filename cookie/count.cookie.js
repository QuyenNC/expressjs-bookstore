var db = require("../db");
//using mongoose
var Users = require("../models/users.models.js");
module.exports.countCookie =async function(req, res, next){
    if(req.signedCookies.userId){
        var users = await Users.findById(req.signedCookies.userId);
        var countRequets = users.countRequets;
        await Users.findByIdAndUpdate({_id:req.signedCookies.userId},{countRequets: countRequets + 1})
        res.cookie("count", users.countRequets);
    }
    next();
};