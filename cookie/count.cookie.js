var db = require("../db");
module.exports.countCookie = function(req, res, next){
    if(req.signedCookies){
        db.update('countCookieRequets', n => n + 1).write();
    }
    res.cookie("count", db.get('countCookieRequets').value())
    next();
};