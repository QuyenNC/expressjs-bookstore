
//using mongoose
var Books = require("../models/books.models");
var Users = require("../models/users.models.js");
var Sessions =require("../models/sessions.models");
module.exports = {
    index :async  function(req, res){
      var cart = [];
      var sessions = await Sessions.findById(req.signedCookies.sessionId);
      var myMap = sessions.cart;
      var books = [ ...myMap.entries()];
      var user = await Users.findById(req.signedCookies.userId);
      for (const key of books) {
        var pro = await Books.findById(key[0]);
        pro.count = key[1];
        cart.push(pro);
      }
      res.render('cart/index',{
        session : sessions,
        product : cart,
        users: user
      });
    },
    addToCart:async function(req, res, next){
      var bookId = req.params.bookId;
      var sessions = await Sessions.findById(req.signedCookies.sessionId);
      if(!req.signedCookies.sessionId){
        res.redirect('/');
        return;
      }
      var count = sessions.cart.get(bookId);
      if(count === undefined){
        count = 0;
      }
      await sessions.cart.set(bookId,  count + 1);
      var countBook = 0;
      var books = [ ...sessions.cart.values()];
      for (const iterator of books) {
        countBook += iterator;
      }
      await Sessions.updateOne({_id : req.signedCookies.sessionId},{ numberOfBook: countBook});
      sessions.save();
      res.redirect('/')
    }
}