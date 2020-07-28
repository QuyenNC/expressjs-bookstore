var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var booksSchema = new Schema({
    name: String,
    description: String,
    coverUrl: String,
    count: Number
});
var Books = mongoose.model('Books', booksSchema,"books");
module.exports = Books;