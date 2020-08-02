
//using mongoose
var Books = require("../../models/books.models");
var Users = require("../../models/users.models.js");
var Transactions = require("../../models/transactions.models.js");
var Sessions =require("../../models/sessions.models");

module.exports = {
    index : async function(req, res){
    var transactions = await Transactions.find();
      res.json(transactions);
    }
}