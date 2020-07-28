//using lowdb
var db = require("../db");
module.exports = {
    index : function(req, res){
      var cart = [];
      var product =db.get('sesstion').find({id : req.signedCookies.sessionId}).value() ;
        for(var id in product.cart ){
          var pro = db.get('books').find({id : id}).value();
          pro.count = product.cart[id];
          cart.push(pro);
        }
        res.render('cart/index',{
          session : db.get('sesstion').find({id : req.signedCookies.sessionId}).value(),
          product : cart
        });
    },
    addToCart: function(req, res, next){
      var bookId = req.params.bookId;
      var sessionId = req.signedCookies.sessionId;
      if(!sessionId){
        res.redirect('/');
        return
      }
      var count = db.get('sesstion').find({id : sessionId}).get('cart.' + bookId,0 ).value();
      
      db.get('sesstion').find({id : sessionId}).set('cart.' + bookId , count + 1).write();
      var numberCart = db.get('sesstion').find({id : sessionId}).value().cart;
      var countBook = 0;
      
      for (let value of Object.values(numberCart)) {
        countBook += value;
      }
      db.get('sesstion').find({id : sessionId}).assign({ numberOfBook: countBook}).write();
      res.redirect('/')
    }
}