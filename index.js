//using dotenv
require('dotenv').config();
const express = require("express");
const app = express();
const port = 7000;
//usin mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);
//using cookies
var cookieParser = require('cookie-parser')
app.use(cookieParser(process.env.SESSION_SECRET))
//using pug
app.set('view engine', 'pug');
app.set('views', './views');
//using router
var books = require('./router/books.route');
var users = require('./router/users.route');
var transactions = require('./router/transaction.route');
var auth = require('./router/auth.route');
var profile = require('./router/profile.route');
var cart = require('./router/cart.route');
//using nodemail
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
//using req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Public static file
app.use(express.static('public'));
//cart
var seesionMiddleware = require('./cookie/cart.middleware');
app.use(seesionMiddleware.shoppingCart);
//Using lowdb
var db = require('./db')
//using mongoose
var Books = require("./models/books.models");
var Users = require("./models/users.models.js");
var Sessions = require("./models/sessions.models.js");
//Count cookies
var cookies = require('./cookie/count.cookie');
app.use(cookies.countCookie);
var authRequest = require('./cookie/auth.middleware');
//rest api
var apiLogin = require('./api/routes/login.route');
var apiTran = require('./api/routes/transactions.route');
//Route show index
app.get('/',async function(req, res){
  var books = await Books.find();
  var user = await Users.findById(req.signedCookies.userId);
  var sessions = await Sessions.findById(req.signedCookies.sessionId);
  res.render('index',{
    session : sessions,
    books: books,
    users : user
  });
});
app.use('/transaction',authRequest.authRequest,transactions);
app.use('/users',authRequest.authRequest,users);
app.use('/books',books);
app.use('/auth',auth);
app.use('/profile',authRequest.authRequest,profile);
app.use('/cart',cart);
app.use('/api',apiTran)
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
