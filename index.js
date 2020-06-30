//using dotenv
require('dotenv').config();


const express = require("express");
const app = express();
const port = 5000;
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
//using nodemail
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
//using req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Public static file
app.use(express.static('public'));
//Using lowdb
var db = require('./db')
//Count cookies
var cookies = require('./cookie/count.cookie');
var authRequest = require('./cookie/auth.middleware');
//Route show index
app.get('/',function(req, res){
  res.render('layout/common',{
    users : db.get('users').find({id :req.signedCookies.userId }).value()
  });
});
app.use('/transaction',authRequest.authRequest,cookies.countCookie,transactions);
app.use('/users',authRequest.authRequest,cookies.countCookie,users);
app.use('/books',authRequest.authRequest,cookies.countCookie,books);
app.use('/auth',cookies.countCookie,auth);
app.use('/profile',cookies.countCookie,profile);
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
