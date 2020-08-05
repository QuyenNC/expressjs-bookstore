var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shopsSchema = new Schema({
    name: String,
    adress: String,
    coverUrl: String,
    userId: String
});
var Shops = mongoose.model('Shops', shopsSchema,"shops");
module.exports = Shops;