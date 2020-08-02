var express = require('express');
var router = express.Router();
//using transactionController
var transactionControler = require("../controller/transactions.controller");


router.get('/transaction',transactionControler.index);
router.post('/login',transactionControler.postLogin);

module.exports = router;