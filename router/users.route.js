var express = require('express');
var router = express.Router();
//using lowdb
var db = require("../db");
//using shortid
var shortid = require('shortid');
//using userController
var userControler = require("../controller/user.controller");
//using validate
var validateCreateUser = require("../validate/users.validate")
//count cookie
var cookies = require("../cookie/count.cookie");

router.get('/',cookies.countCookie,userControler.index);
router.get("/search",cookies.countCookie,userControler.search);
//Route view users
router.get('/view/:id',cookies.countCookie,userControler.view)
//Route delete users
router.get('/:id/delete',cookies.countCookie,userControler.delete)
//Route update users
router.get('/update/:id',cookies.countCookie,userControler.update)
router.post('/update/:id',cookies.countCookie,userControler.postUpdate);
//Route create users
router.get('/create',cookies.countCookie,userControler.create);

router.post('/create',validateCreateUser.valPostCreate, userControler.postCreate);

module.exports = router;