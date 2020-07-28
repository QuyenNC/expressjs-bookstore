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
//Count cookies
var cookies = require('./cookie/count.cookie');
app.use(cookies.countCookie);
var authRequest = require('./cookie/auth.middleware');
//Route show index
app.get('/',function(req, res){
  res.render('index',{
    session : db.get('sesstion').find({id : req.signedCookies.sessionId}).value(),
    books: db.get('books').value(),
    users : db.get('users').find({id : req.signedCookies.userId}).value()
  });
});
app.use('/transaction',authRequest.authRequest,transactions);
app.use('/users',authRequest.authRequest,users);
app.use('/books',books);
app.use('/auth',auth);
app.use('/profile',authRequest.authRequest,profile);
app.use('/cart',cart);
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
