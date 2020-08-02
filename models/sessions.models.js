var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sessionsSchema = new Schema({
      numberOfBook: Number,
      cart: {
            type :Map,
            of : Number
      }
});
var Sessions = mongoose.model('Sessions', sessionsSchema,"sesstion");
module.exports = Sessions;