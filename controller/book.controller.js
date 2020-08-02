
//using shortid
var shortid = require('shortid');
var fs = require('fs');
//using mongoose
var Books = require("../models/books.models");
var Users = require("../models/users.models.js");
var Sessions = require("../models/sessions.models.js");
//using cloudinary
var cloudinary = require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: process.env.cloud_name,       
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret 
});

module.exports = {
    index : async function(req, res){
        var books = await Books.find();
        var users = await Users.find();
        var sessions = await Sessions.findById(req.signedCookies.sessionId);
        res.render('books/index',{
            books : books,
            users : users,
            session : sessions
        });
      },
    search : async function(req, res){
        var q = req.query.q;
        var books = await Books.find();
        var users = await Users.find();
        var sessions = await Sessions.findById(req.signedCookies.sessionId);
        var matchedBooks = books.filter(function(x){
            return x.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        });
        res.render('books/index',{
            books : matchedBooks,
            q : q,
            users : users,
            session : sessions
        });
    },
    view :async function(req, res){
        var id = req.params.id;
        var book = await Books.findById(id);
        var users = await Users.find();
        var sessions = await Sessions.findById(req.signedCookies.sessionId);
        res.render('books/viewinfo',{
            info: book,
            users :users,
            session : sessions
        })},
    delete : async function(req, res){
        var id = req.params.id;
        await Books.deleteOne({_id : id});
        res.redirect('/books');
    },
    update : async function(req, res){
        var id = req.params.id;
        var book = await Books.findById({ _id: id });
        var users = await Users.find();
        var sessions = await Sessions.findById(req.signedCookies.sessionId);
        res.render('books/update',{
            info: book,
            users : users,
            session : sessions
        });
    },
    postUpdate :async function(req, res){
        var id = req.body.id;
        var nameUpdate = req.body.name;
        var desUpdate = req.body.description
        await Books.updateOne({_id : id},{ name: nameUpdate , description: desUpdate});
        res.redirect('/books');
    },
    create : async function(req, res){
        var users = await Users.find();
        var sessions = await Sessions.findById(req.signedCookies.sessionId);
        res.render('books/create',{
            users : users,
            session : sessions
        });
    },
    postCreate: async function(req, res){
        req.body.id = shortid.generate();
        var coverImg = await cloudinary.uploader.upload(req.file.path);
        req.body.coverUrl = coverImg.url;
        await Books.insertMany(req.body);
          fs.unlinkSync(req.file.path);
        res.redirect('/books');
    }
}