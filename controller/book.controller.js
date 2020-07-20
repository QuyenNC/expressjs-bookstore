//using lowdb
var db = require("../db");
//using shortid
var shortid = require('shortid');
var fs = require('fs');

//using cloudinary
var cloudinary = require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret 
});

module.exports = {
    index : function(req, res){
        res.render('books/index',{
            books : db.get('books').value(),
            users : db.get('users').find({id : req.signedCookies.userId}).value(),
            session : db.get('sesstion').find({id : req.signedCookies.sessionId}).value()
        });
      },
    search : function(req, res){
        var q = req.query.q;
        var matchedBooks = db.get('books').value().filter(function(x){
            return x.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        });
        res.render('books/index',{
            books : matchedBooks,
            q : q,
            users : db.get('users').find({id : req.signedCookies.userId}).value(),
            session : db.get('sesstion').find({id : req.signedCookies.sessionId}).value()
        });
    },
    view : function(req, res){
        var id = req.params.id;
        var book = db.get('books').find({ id: id }).value();
        res.render('books/viewinfo',{
            info: book,
            users : db.get('users').find({id : req.signedCookies.userId}).value(),
            session : db.get('sesstion').find({id : req.signedCookies.sessionId}).value()
        })},
    delete : function(req, res){
        var id = req.params.id;
        var book = db.get('books').remove({id : id}).write();
        res.redirect('/books');
    },
    update : function(req, res){
        var id = req.params.id;
        var book = db.get('books').find({ id: id }).value();
        res.render('books/update',{
            info: book,
            users : db.get('users').find({id : req.signedCookies.userId}).value(),
            session : db.get('sesstion').find({id : req.signedCookies.sessionId}).value()
        });
    },
    postUpdate : function(req, res){
        var id = req.body.id;
        var nameUpdate = req.body.name;
        var desUpdate = req.body.description
        db.get('books').find({ id: id }) .assign({ name:nameUpdate , description:desUpdate}).write();
        res.redirect('/books');
    },
    create : function(req, res){
        res.render('books/create',{
            users : db.get('users').find({id : req.signedCookies.userId}).value(),
            session : db.get('sesstion').find({id : req.signedCookies.sessionId}).value()
        });
    },
    postCreate: async function(req, res){
        req.body.id = shortid.generate();
        var coverImg = await cloudinary.uploader.upload(req.file.path);
        req.body.coverUrl = coverImg.url;
          fs.unlinkSync(req.file.path);
        db.get('books').push(req.body).write();
        res.redirect('/books');
    }
}