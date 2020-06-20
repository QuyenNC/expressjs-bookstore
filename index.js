const express = require("express");
const app = express();
const port = 3000;
//using cookies
var cookieParser = require('cookie-parser')
app.use(cookieParser())
//using pug
app.set('view engine', 'pug');
app.set('views', './views');
//using router
var books = require('./router/books.route');
var users = require('./router/users.route');
var transactions = require('./router/transaction.route');
var auth = require('./router/auth.route');
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
    users : db.get('users').find({id :req.cookies.userId }).value()
  });
});
app.use('/transaction',authRequest.authRequest,cookies.countCookie,transactions);
app.use('/users',authRequest.authRequest,cookies.countCookie,users);
app.use('/books',authRequest.authRequest,cookies.countCookie,books);
app.use('/auth',cookies.countCookie,auth);
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
