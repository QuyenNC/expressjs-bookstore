const express = require("express");
const app = express();
const port = 3000

//using pug
app.set('view engine', 'pug');
app.set('views', './views');

//using router
var books = require('./router/books.route');
var users = require('./router/users.route');
var transactions = require('./router/transaction.route');

//using lowdb
var db = require("./db");
const { reduce } = require("./db");

//using req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//using shortid
const shortid = require('shortid');

//Route show index
app.get('/',function(req, res){
  res.render('index')
});

app.use('/transaction',transactions);
app.use('/users', users);
app.use('/books', books);



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
