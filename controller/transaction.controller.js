//using lowdb
var db = require("../db");
//using shortid
var shortid = require('shortid');

module.exports = {
    index : function(req, res){
      var page = parseInt(req.query.page) || 1;
      var perPage = 8;
      var start = (page - 1) * perPage;
      var end = page * perPage;
      var transactionsUser = db.get('transaction').value()
      .filter(function(x){
        return x.userId === req.signedCookies.userId;
      });
      var transactionsAdmin = db.get('transaction').value();
        res.render('transaction/index',{
          transactionsUser: transactionsUser.slice(start, end),
          transactionsAdmin: transactionsAdmin.slice(start, end),
          users : db.get('users').find({id : req.signedCookies.userId}).value(),
          session : db.get('sesstion').find({id : req.signedCookies.sessionId}).value()
        })
      },
    view : function(req, res){
        var id = req.params.id;
        var tran = db.get('transaction').find({ id: id }).value();
        res.render('transaction/viewtran',{
            info: tran,
            users : db.get('users').find({id : req.signedCookies.userId}).value(),
            session : db.get('sesstion').find({id : req.signedCookies.sessionId}).value()
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
            trans :  db.get('books').value(),
            users : db.get('users').find({id : req.signedCookies.userId}).value(),
            session : db.get('sesstion').find({id : req.signedCookies.sessionId}).value()
        });
      },
    postUpdate : function(req, res){
        var id = req.body.id;
        var booksnameUpdate = req.body.booksname;
        db.get('transaction').find({ id: id }).assign({ booksname:booksnameUpdate  }).write();
        res.redirect('/transaction')
      },
    create : function(req, res){
      var userName = db.get('users').find({id : req.signedCookies.userId}).value().name;
      var userId = db.get('users').find({id : req.signedCookies.userId}).value().id;
      var booksName = db.get('sesstion').find({id : req.signedCookies.sessionId}).value();
        for(var idBook in booksName.cart ){
          var id = shortid.generate();
          var pro = db.get('books').find({id : idBook}).value();
          var bookName = pro.name;
          db.get('transaction').push({id: id, userName: userName, userId: userId, booksName : bookName, countBook : booksName.cart[idBook]}).write();
          delete booksName.cart[idBook];
        }
        db.get('sesstion').find({id : req.signedCookies.sessionId}).value().numberOfBook = 0;
      res.redirect('/')
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