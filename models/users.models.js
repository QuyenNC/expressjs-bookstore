var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    password: String,
    email: String,
    date: Date,
    isAdmin: Boolean,
    wrongLoginCount: Number,
    avatarUrl: String,
    countRequets:Number
});
var Users = mongoose.model('Users', userSchema,"users");
module.exports = Users;
