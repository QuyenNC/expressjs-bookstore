var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    password: String,
    email: String,
    date: { type: Date, default: Date.now },
    isAdmin: Boolean,
    wrongLoginCount: Number,
    avatarUrl: String
});
var Users = mongoose.model('Users', userSchema,"users");
module.exports = Users;
