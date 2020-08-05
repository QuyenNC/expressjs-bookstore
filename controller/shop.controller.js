

var fs = require('fs');
//using mongoose
var Books = require("../models/books.models");
var Users = require("../models/users.models.js");
var Sessions = require("../models/sessions.models.js");
var Shops = require("../models/shops.models");
//using cloudinary
var cloudinary = require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: process.env.cloud_name,       
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret 
});

module.exports = {
    // index : async function(req, res){
    //     var books = await Books.find();
    //     var users = await Users.find();
    //     var shop = await Shops.find({userId : req.signedCookies.userId});
    //     var userId = req.signedCookies.userId;
    //     var sessions = await Sessions.findById(req.signedCookies.sessionId);
    //     res.render('shop/index',{
    //         books : books,
    //         users : users,
    //         session : sessions,
    //         shop : shop,
    //         userId : userId
    //     });
    //   },
    // search : async function(req, res){
    //     var q = req.query.q;
    //     var books = await Books.find();
    //     var users = await Users.find();
    //     var sessions = await Sessions.findById(req.signedCookies.sessionId);
    //     var matchedBooks = books.filter(function(x){
    //         return x.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    //     });
    //     res.render('books/index',{
    //         books : matchedBooks,
    //         q : q,
    //         users : users,
    //         session : sessions
    //     });
    // },
    view :async function(req, res){
        var id = req.params.id;
        var shop = await Shops.findById(id);
        var book = await Books.find({userId : shop.userId});
        var user =await Users.findById(req.signedCookies.userId);
        var sessions = await Sessions.findById(req.signedCookies.sessionId);
        var role = 0;
        if(user == null){
            role = 0;
           
        }else if(shop.userId == user._id) {
            role = 1;
           
        }
        res.render('shop/index',{
            shop : shop,
            users :user,
            session : sessions,
            books : book,
            role : role
        })},
    // delete : async function(req, res){
    //     var id = req.params.id;
    //     await Books.deleteOne({_id : id});
    //     res.redirect('/books');
    // },
    // update : async function(req, res){
    //     var id = req.params.id;
    //     var book = await Books.findById({ _id: id });
    //     var users = await Users.find();
    //     var sessions = await Sessions.findById(req.signedCookies.sessionId);
    //     res.render('books/update',{
    //         info: book,
    //         users : users,
    //         session : sessions
    //     });
    // },
    // postUpdate :async function(req, res){
    //     var id = req.body.id;
    //     var nameUpdate = req.body.name;
    //     var desUpdate = req.body.description
    //     await Books.updateOne({_id : id},{ name: nameUpdate , description: desUpdate});
    //     res.redirect('/books');
    // },
    create : async function(req, res){
        var users = await Users.find();
        var sessions = await Sessions.findById(req.signedCookies.sessionId);
        res.render('shop/create',{
            users : users,
            session : sessions
        });
    },
    postCreate: async function(req, res){
        req.body.userId = req.signedCookies.userId;
        var coverImg = await cloudinary.uploader.upload(req.file.path);
        req.body.coverUrl = coverImg.url;
        await Shops.create(req.body);
          fs.unlinkSync(req.file.path);
        res.redirect('/');
    }
}