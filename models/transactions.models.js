var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionSchema = new Schema({
        userName: String,
        booksName: String,
        countBook: Number,
        isComplete: Boolean
});
var Transactions = mongoose.model('Transactions', transactionSchema,"transaction");
module.exports = Transactions;
