//using lowdb
var db = require("../db");
//using shortid
var shortid = require('shortid');

module.exports = {
    index : function(req, res){
        res.render('books/index',{
            books : db.get('books').value()
        });
      },
    search : function(req, res){
        var q = req.query.q;
        var matchedBooks = db.get('books').value().filter(function(x){
            return x.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        });
        res.render('books/index',{
            books : matchedBooks,
            q : q
        });
    },
    view : function(req, res){
        var id = req.params.id;
        var book = db.get('books').find({ id: id }).value();
        res.render('books/viewinfo',{
            info: book
        })},
    delete : function(req, res){
        var id = req.params.id;
        var book = db.get('books').remove({id : id}).write();
        res.render('books/index',{
            books : db.get('books').value()
        });
    },
    update : function(req, res){
        var id = req.params.id;
        var book = db.get('books').find({ id: id }).value();
        res.render('books/update',{
            info: book
        });
    },
    postUpdate : function(req, res){
        var id = req.body.id;
        var nameUpdate = req.body.name;
        var desUpdate = req.body.description
        db.get('books').find({ id: id }) .assign({ name:nameUpdate , description:desUpdate}).write();
        res.render('books/index',{
            books : db.get('books').value()
        });
    },
    create : function(req, res){
        res.render('books/create');
    },
    postCreate: function(req, res){
        req.body.id = shortid.generate();
        db.get('books').push(req.body).write();
        // res.redirect('index');
        res.render('books/index',{
            books : db.get('books').value()
        });
    }
}