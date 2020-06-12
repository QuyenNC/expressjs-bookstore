var express = require('express');
var router = express.Router();
//using lowdb
var db = require("../db");
//using shortid
const shortid = require('shortid');

router.get('/',function(req, res){
    res.render('users/index',{
        users : db.get('users').value()
    });
  });
router.get("/search",function(req, res){
    var q = req.query.q;
    var matchedusers = db.get('users').value().filter(function(x){
        return x.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index',{
        users : matchedusers,
        q : q
    });
});
//Route view book
router.get('/view/:id',function(req, res){
    var id = req.params.id;
    var book = db.get('users').find({ id: id }).value();
    res.render('users/viewinfo',{
        info: book
    });
})
//Route delete book
router.get('/:id/delete',function(req, res){
    var id = req.params.id;
    var book = db.get('users').remove({id : id}).write();
    res.render('users/index',{
        users : db.get('users').value()
    });
})
//Route update book
router.get('/update/:id',function(req, res){
    var id = req.params.id;
    var user = db.get('users').find({ id: id }).value();
    res.render('users/update',{
        info: user
    });
})
router.post('/update/:id',function(req, res){
    var id = req.body.id;
    var nameUpdate = req.body.name;
    var desUpdate = req.body.description
    db.get('users').find({ id: id }) .assign({ name:nameUpdate , description:desUpdate}).write();
    res.render('users/index',{
        users : db.get('users').value()
    });
});
//Route create users
router.get('/create',function(req, res){
    res.render('users/create');
});

router.post('/create',function(req, res){
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.render('users/index',{
        users : db.get('users').value()
    });
});

module.exports = router;