var express = require('express');
var router = express.Router();
//using lowdb
var db = require("../db");
//using shortid
const shortid = require('shortid');

router.get('/',function(req, res){
    res.render('books/index',{
        books : db.get('books').value()
    });
  });
router.get("/search",function(req, res){
    var q = req.query.q;
    var matchedBooks = db.get('books').value().filter(function(x){
        return x.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('books/index',{
        books : matchedBooks,
        q : q
    });
});
//Route view book
router.get('/view/:id',function(req, res){
    var id = req.params.id;
    var book = db.get('books').find({ id: id }).value();
    res.render('books/viewinfo',{
        info: book
    });
})
//Route delete book
router.get('/:id/delete',function(req, res){
    var id = req.params.id;
    var book = db.get('books').remove({id : id}).write();
    res.render('books/index',{
        books : db.get('books').value()
    });
})
//Route update book
router.get('/update/:id',function(req, res){
    var id = req.params.id;
    var book = db.get('books').find({ id: id }).value();
    res.render('books/update',{
        info: book
    });
})
router.post('/update/:id',function(req, res){
    var id = req.body.id;
    var nameUpdate = req.body.name;
    var desUpdate = req.body.description
    db.get('books').find({ id: id }) .assign({ name:nameUpdate , description:desUpdate}).write();
    res.render('books/index',{
        books : db.get('books').value()
    });
});
//Route create books
router.get('/create',function(req, res){
    res.render('books/create');
});

router.post('/create',function(req, res){
    req.body.id = shortid.generate();
    db.get('books').push(req.body).write();
    // res.redirect('index');
    res.render('books/index',{
        books : db.get('books').value()
    });
});

module.exports = router;