//using lowdb
var db = require("../db");
//using shortid
var shortid = require('shortid');

module.exports = {
    index : function(req, res){
        res.render('users/index',{
            users : db.get('users').value()
        });
      },
    search : function(req, res){
        var q = req.query.q;
        var matchedusers = db.get('users').value().filter(function(x){
            return x.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        });
        res.render('users/index',{
            users : matchedusers,
            q : q
        });
    },
    view : function(req, res){
        var id = req.params.id;
        var book = db.get('users').find({ id: id }).value();
        res.render('users/viewinfo',{
            info: book
        });
    },
    delete : function(req, res){
        var id = req.params.id;
        var book = db.get('users').remove({id : id}).write();
        res.render('users/index',{
            users : db.get('users').value()
        });
    },
    update : function(req, res){
        var id = req.params.id;
        var user = db.get('users').find({ id: id }).value();
        res.render('users/update',{
            info: user
        });
    },
    postUpdate : function(req, res){
        var id = req.body.id;
        var nameUpdate = req.body.name;
        var dateUpdate = req.body.date
        db.get('users').find({ id: id }) .assign({ name:nameUpdate , date:dateUpdate}).write();
        res.render('users/index',{
            users : db.get('users').value()
        });
    },
    create : function(req, res){
        res.render('users/create');
    },
    postCreate: function(req, res){
        req.body.id = shortid.generate();
        var erros = [];
        if(!req.body.name  ){
            erros.push('Username is required');
        }
        if(req.body.name.length > 30 ){
            erros.push('Username is greater than 30 characters')
        }
        if(!req.body.password){
            erros.push('Password is required');
        }
        if(!req.body.email){
            erros.push('Email is required');
        }
        if(!req.body.date){
            erros.push('Date is required');
        }
        if(erros.length){
            res.render('users/create',{
                erros : erros,
                values : req.body
            });
            return;
        }
        db.get('users').push(req.body).write();
        res.render('users/index',{
            users : db.get('users').value()
        });
    }
}