//using dotenv
require('dotenv').config();
var fs = require('fs');

//using cloudinary
var cloudinary = require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret 
});
//using lowdb
var db = require("../db");
//using shortid
var shortid = require('shortid');

module.exports = {
    index : function(req, res){
        res.render('profile/index',{
          users : db.get('users').find({id : req.signedCookies.userId}).value(),
          session : db.get('sesstion').find({id : req.signedCookies.sessionId}).value()
        });
    },
    postUpdate : async function(req, res){
      var avatarUrl = await cloudinary.uploader.upload(req.file.path);
      db.get('users').find({ id:req.signedCookies.userId  }) .assign({ name:req.body.name , date:req.body.date, email:req.body.email, avatarUrl:avatarUrl.url}).write();
      fs.unlinkSync(req.file.path);
      res.redirect('/profile')
    }
}