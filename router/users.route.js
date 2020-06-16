var express = require('express');
var router = express.Router();
//using lowdb
var db = require("../db");
//using shortid
var shortid = require('shortid');
//using userController
var userControler = require("../controller/user.controller");

router.get('/',userControler.index);
router.get("/search",userControler.search);
//Route view users
router.get('/view/:id',userControler.view)
//Route delete users
router.get('/:id/delete',userControler.delete)
//Route update users
router.get('/update/:id',userControler.update)
router.post('/update/:id',userControler.postUpdate);
//Route create users
router.get('/create',userControler.create);

router.post('/create',userControler.postCreate);

module.exports = router;