var express = require('express');
var router = express.Router();
//using lowdb
var db = require("../db");
//using shortid
const shortid = require('shortid');
//using transactionController
var transactionControler = require("../controller/transaction.controller");


router.get('/',transactionControler.index);
router.get('/create',transactionControler.create);
  //Route view transaction
router.get('/view/:id',transactionControler.view);
  //Route delete transaction
router.get('/:id/delete',transactionControler.delete);
  //Route update tran
router.get('/update/:id',transactionControler.update);
router.post('/update/:id',transactionControler.postUpdate);
  //route complete transaction
router.get('/:id/complete',transactionControler.complete);

router.get('/:id/uncomplete',transactionControler.uncomplete);

module.exports = router;