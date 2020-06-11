const express = require("express");
const app = express();
const port = 3000
//using pug
app.set('view engine', 'pug');
app.set('views', './views');
//using shortid
const shortid = require('shortid');
//using lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
db.defaults({ books: []})
  .write()
//using req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Route show book
app.get('/',function(req, res){
  res.render('index',{
      books : db.get('books').value()
  });
})
//Route search book
app.get("/books/search",function(req, res){
    var q = req.query.q;
    var matchedBooks = db.get('books').value().filter(function(x){
        return x.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('index',{
        books : matchedBooks,
        q : q
    });
});
//Route view book
app.get('/books/view/:id',function(req, res){
    var id = req.params.id;
    var book = db.get('books').find({ id: id }).value();
    res.render('books/viewinfo',{
        info: book
    });
})
//Route delete book
app.get('/books/:id/delete',function(req, res){
    var id = req.params.id;
    var book = db.get('books').remove({id : id}).write();
    res.render('index',{
        books : db.get('books').value()
    });
})
//Route update book
app.get('/books/update/:id',function(req, res){
    var id = req.params.id;
    var book = db.get('books').find({ id: id }).value();
    res.render('books/update',{
        info: book
    });
})
app.post('/books/update/:id',function(req, res){
    var id = req.body.id;
    var nameUpdate = req.body.name;
    var desUpdate = req.body.description
    db.get('books').find({ id: id }) .assign({ name:nameUpdate , description:desUpdate}).write();
    res.render('index',{
        books : db.get('books').value()
    });
});
//Route create books
app.get('/books/create',function(req, res){
    res.render('books/create');
});

app.post('/books/create',function(req, res){
    req.body.id = shortid.generate();
    db.get('books').push(req.body).write();
    res.redirect('/');
});
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
