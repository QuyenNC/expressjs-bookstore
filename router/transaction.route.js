var express = require('express');
var router = express.Router();
//using lowdb
var db = require("../db");
//using shortid
const shortid = require('shortid');

router.get('/',function(req, res){
    res.render('transaction/index',{
      transactions : db.get('transaction').value()
    })
  })
router.get('/create',function(req, res){
    res.render('transaction/create',{
        users : db.get('users').value(),
        books : db.get('books').value(),
    });
  });
  
router.post('/create',function(req, res){
    req.body.bookId = db.get('books').find({ name: req.body.booksname }).value().id;
    req.body.userId = db.get('users').find({ name: req.body.username }).value().id;
    req.body.id = shortid.generate();
    db.get('transaction').push(req.body).write();
    res.redirect('/transaction')
    
  })
  //Route view transaction
router.get('/view/:id',function(req, res){
    var id = req.params.id;
    var tran = db.get('transaction').find({ id: id }).value();
    res.render('transaction/viewtran',{
        info: tran
    });
  })
  //Route delete transaction
router.get('/:id/delete',function(req, res){
    var id = req.params.id;
    var tran = db.get('transaction').remove({id : id}).write();
    res.redirect('/transaction');
  })
  //Route update tran
router.get('/update/:id',function(req, res){
    var id = req.params.id;
    var tran = db.get('transaction').find({ id: id }).value();
    res.render('transaction/update',{
        info: tran,
        trans :  db.get('books').value()
    });
  })
router.post('/update/:id',function(req, res){
    var id = req.body.id;
    var booksnameUpdate = req.body.booksname;
    db.get('transaction').find({ id: id }) .assign({ booksname:booksnameUpdate  }).write();
    res.redirect('/transaction')
  });
  

module.exports = router;