var express = require('express');
var router = express.Router();
//using lowdb
var db = require("../db");
//using shortid
const shortid = require('shortid');
//using transactionController
var transactionControler = require("../controller/transaction.controller");
//count cookie
var cookies = require("../cookie/count.cookie");

router.get('/',cookies.countCookie,transactionControler.index);
router.get('/create',cookies.countCookie,transactionControler.create);
  
router.post('/create',cookies.countCookie,transactionControler.postCreate);
  //Route view transaction
router.get('/view/:id',cookies.countCookie,transactionControler.view);
  //Route delete transaction
router.get('/:id/delete',cookies.countCookie,transactionControler.delete);
  //Route update tran
router.get('/update/:id',cookies.countCookie,transactionControler.update);
router.post('/update/:id',cookies.countCookie,transactionControler.postUpdate);
  //route complete transaction
router.get('/:id/complete',cookies.countCookie,transactionControler.complete);

router.get('/:id/uncomplete',cookies.countCookie,transactionControler.uncomplete);

module.exports = router;