const express = require("express");
const app = express();
const port = 3000
//using pug
app.set('view engine', 'pug');
app.set('views', './views');
//using router
var books = require('./router/books.route');
var users = require('./router/users.route');
//using lowdb
var db = require("./db");
//using req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Route show book
app.get('/',function(req, res){
  res.render('index')
});
app.use('/users', users);
app.use('/books', books);
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
