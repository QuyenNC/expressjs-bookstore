//using lowdb
var db = require("../db");
//using shortid
var shortid = require('shortid');

module.exports = {
    index : function(req, res){
        
        res.render('transaction/index',{
          transactionsUser: db.get('transaction').value().filter(function(x){
            return x.userId === req.cookies.userId;
          }),
          transactionsAdmin: db.get('transaction').value(),
          users : db.get('users').find({id : req.cookies.userId}).value()
        })
      },
    view : function(req, res){
        var id = req.params.id;
        var tran = db.get('transaction').find({ id: id }).value();
        res.render('transaction/viewtran',{
            info: tran
        });
      },
    delete : function(req, res){
        var id = req.params.id;
        var tran = db.get('transaction').remove({id : id}).write();
        res.redirect('/transaction');
      },
    update : function(req, res){
        var id = req.params.id;
        var tran = db.get('transaction').find({ id: id }).value();
        res.render('transaction/update',{
            info: tran,
            trans :  db.get('books').value()
        });
      },
    postUpdate : function(req, res){
        var id = req.body.id;
        var booksnameUpdate = req.body.booksname;
        db.get('transaction').find({ id: id }).assign({ booksname:booksnameUpdate  }).write();
        res.redirect('/transaction')
      },
    create : function(req, res){
        res.render('transaction/create',{
            users : db.get('users').find({id : req.cookies.userId}).value(),
            books : db.get('books').value(),
        });
      },
    postCreate: function(req, res){
        req.body.bookId = db.get('books').find({ name: req.body.booksname }).value().id;
        req.body.userId = db.get('users').find({ name: req.body.username }).value().id;
        req.body.id = shortid.generate();
        db.get('transaction').push(req.body).write();
        res.redirect('/transaction')
    },
    complete : function(req, res){
        var id = req.params.id;
        var errors = [];
        if(db.get('transaction').find({ id: id }).value() === undefined){
            errors.push("Transaction is required")
        }
        if(errors.length){
          res.render('transaction/index',{
            transactions : db.get('transaction').value(),
            errors : errors
          })
          return;
        }
        db.get('transaction').find({ id: id }).assign({ isComplete: true  }).write();
        res.redirect('/transaction')
    },
    uncomplete : function(req, res){
        var id = req.params.id;
        db.get('transaction').find({ id: id }).assign({ isComplete: false  }).write();
        res.redirect('/transaction')
    }
}