//using lowdb
var db = require("../db");
//using mongoose
var Books = require("../models/books.models");
var Users = require("../models/users.models.js");
var Transactions = require("../models/transactions.models.js");
var Sessions =require("../models/sessions.models");
//using shortid
var shortid = require('shortid');

module.exports = {
    index : async function(req, res){
      var user = await Users.findById(req.signedCookies.userId);
      var transactions= await Transactions.find();
      var sessions = await Sessions.findById(req.signedCookies.sessionId);
      var transactionsUser = transactions
      .filter(function(x){
        return x.userId === req.signedCookies.userId;
      });
      var transactionsAdmin = transactions;
        res.render('transaction/index',{
          transactionsUser: transactionsUser,
          transactionsAdmin: transactionsAdmin,
          users : user,
          session :sessions
        })
      },
    view : async function(req, res){
        var id = req.params.id;
        var tran = await Transactions.findById(id);
        var sessions = await Sessions.findById(req.signedCookies.sessionId);
        var user =await Users.findById(req.signedCookies.userId);
        res.render('transaction/viewtran',{
            info: tran,
            users : user,
            session : sessions
        });
      },
    delete : async function(req, res){
        var id = req.params.id;
        await Transactions.deleteOne({_id : id});
        res.redirect('/transaction');
      },
    update : async function(req, res){
        var id = req.params.id;
        var tran = await Transactions.findById(id);
        var book = await Books.find();
        var user = await Users.findById(req.signedCookies.userId);
        var sessions = await Sessions.findById(req.signedCookies.sessionId);
        res.render('transaction/update',{
            info: tran,
            trans :  book,
            users : user,
            session : sessions
        });
      },
    postUpdate :async function(req, res){
        var id = req.body.id;
        var booksnameUpdate = req.body.booksname;
        await Transactions.updateOne({_id : id},{ booksName:booksnameUpdate  });
        res.redirect('/transaction')
      },
    create :async function(req, res){
      var user = await Users.findById(req.signedCookies.userId);
       var sessions = await Sessions.findById(req.signedCookies.sessionId);
      var userName = user.name;
      var booksName = await Sessions.findById(req.signedCookies.sessionId);
      var books = [ ...sessions.cart.entries()];
      for (const key of books) {
        var pro = await Books.findById(key[0]);
        var bookName = pro.name;
        await Transactions.insertMany({userName: userName, booksName : bookName, countBook : key[1],isComplete: false});
      }
      await Sessions.updateOne({_id: req.signedCookies.sessionId}, {numberOfBook : 0,cart : {}});
      res.redirect('/')
      },
    complete : async function(req, res){
        var id = req.params.id;
        // var transaction = await Transactions.find();
        // var errors = [];
        // if(! await Transactions.findById(id)){
        //     errors.push("Transaction is required")
        // }
        // if(errors.length){
        //   res.render('transaction/index',{
        //     transactions : transaction,
        //     errors : errors
        //   })
        //   return;
        // }
        await Transactions.updateOne({_id : id},{ isComplete: true  });
        res.redirect('/transaction')
    },
    uncomplete :async function(req, res){
        var id = req.params.id;
        await Transactions.updateOne({_id : id},{ isComplete: false  });
        res.redirect('/transaction')
    }
}