//using lowdb
var db = require("../db");
//using mongoose
var Books = require("../models/books.models");
var Users = require("../models/users.models.js");
var Sessions =require("../models/sessions.models");
//using md5
var md5 = require("md5");
//using bcrypt
var bcrypt = require('bcrypt');
var saltRounds = 10;
//using shortid
var shortid = require('shortid');

module.exports = {
    index : async function(req, res){
        var users = await Users.find();
        var sessions = await Sessions.findById(req.signedCookies.sessionId);
        res.render('users/index',{
            users : users,
            session : sessions
        });
      },
    search : async function(req, res){
        var q = req.query.q;
        var users = await Users.find();
        var matchedusers = users.filter(function(x){
            return x.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        });
        res.render('users/index',{
            users : matchedusers,
            q : q,
            session : db.get('sesstion').find({id : req.signedCookies.sessionId}).value()
        });
    },
    view : async function(req, res){
        var sessions = await Sessions.findById(req.signedCookies.sessionId);
        var id = req.params.id;
        var users = await Users.find();
        var user = await Users.findById(id);
        res.render('users/viewinfo',{
            info: user,
            users:users,
            session : sessions
        });
    },
    delete :async function(req, res){
        var id = req.params.id;
        await Users.deleteOne({_id : id});
        res.redirect('/users');
    },
    update : async function(req, res){
        var id = req.params.id;
        var users = await Users.find();
        var user = await Users.findById(id);
        var sessions = await Sessions.findById(req.signedCookies.sessionId);
        res.render('users/update',{
            info: user,
            users: users,
            session : sessions
        });
    },
    postUpdate : async function(req, res){
        var id = req.body.id;
        var nameUpdate = req.body.name;
        var dateUpdate = req.body.date
        // db.get('users').find({ id: id }) .assign({ name:nameUpdate , date:dateUpdate}).write();
        await Users.updateOne({_id : id},{ name:nameUpdate , date:dateUpdate});
        res.redirect('/users');
    },
    create : function(req, res){
        res.render('users/create');
    },
    postCreate: async function(req, res){
        req.body.isAdmin = false;
        req.body.wrongLoginCount = 0;
        req.body.countRequets = 0;
        bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
            req.body.password = hash
            await Users.insertMany(req.body);
        });
        res.redirect('/users');
    }
}