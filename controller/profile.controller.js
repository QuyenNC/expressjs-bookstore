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

//using mongoose
var Books = require("../models/books.models");
var Users = require("../models/users.models.js");
var Sessions =require("../models/sessions.models");
//using shortid
var shortid = require('shortid');

module.exports = {
    index : async function(req, res){
      var users = await Users.findById(req.signedCookies.userId);
      var sessions = await Sessions.findById(req.signedCookies.sessionId);
        res.render('profile/index',{
          users : users,
          session : sessions
        });
    },
    postUpdate : async function(req, res){
      var avatarUrl = await cloudinary.uploader.upload(req.file.path);
      await Users.updateOne({_id : req.signedCookies.userId},{ name:req.body.name , date:req.body.date, email:req.body.email, avatarUrl:avatarUrl.url});
      fs.unlinkSync(req.file.path);
      res.redirect('/profile')
    }
}